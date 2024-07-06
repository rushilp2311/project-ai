"use client";
import Link from "next/link";
import _ from "lodash";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/util/zodSchema";
import { useToast } from "@/components/ui/use-toast";
import { signInAction } from "@/lib/login-action";

export default function SignUp() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    try {
      const response = await fetch("/api/user", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(values),
      });
      const result = await response.json();
      if (result.error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Error signing up.",
          description: result.error,
        });
      } else {
        await signInAction(_.pick(values, ["email", "password"]));
      }
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Error signing up.",
        description: err.message,
      });
    }
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center ">
      <div>
        <Link href="/">
          <Image src="/logo.svg" height={200} width={200} alt="logo" />
        </Link>
      </div>

      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 w-full text-center">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="text-balance text-muted-foreground">
            Enter details to create account
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="m@example.com" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input required type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Sign up
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/signin" className="underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
