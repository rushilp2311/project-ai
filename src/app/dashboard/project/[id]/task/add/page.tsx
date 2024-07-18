"use client";
import { Search } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { redirect, useParams } from "next/navigation";
import { useForm } from "react-hook-form";

import { AlertCircle, XIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { z } from "zod";
import { taskSchema } from "@/util/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { useMemo, useState } from "react";
import { debounce } from "lodash";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import Loader from "@/components/ui/loader";
import StatusBadge from "@/components/ui/status-badge";
import { useRouter } from "next/navigation";

export default function AddTask() {
  const { toast } = useToast();

  const router = useRouter();

  const params = useParams();
  const { id: projectId } = params;

  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [selectedAssignee, setSelectedAssignee] = useState<any>(null);
  const [assigneeSearchResult, setAssigneeSearchResult] = useState<any>();

  const [error, setError] = useState<string>();

  const debouncedAssigneeSearch = useMemo(() => {
    setError("");
    return debounce(handleAssigneeSearch, 400);
  }, []);

  const handleAssigneeSelect = (assignee: any) => {
    setSelectedAssignee(assignee);
  };

  async function handleAssigneeSearch(event: any) {
    setIsLoading(true);
    try {
      const result = await fetch(
        `/api/user?searchType=fuzzySearch&searchText=${event.target.value}`
      );
      const { data } = await result.json();
      setAssigneeSearchResult(data);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error searching assignee",
      });
    }
    setIsLoading(false);
  }

  const getSearchResult = () => {
    if (isLoading)
      return (
        <div className="flex h-full w-full justify-center items-center">
          <Loader />
        </div>
      );

    if (assigneeSearchResult) {
      return (
        <div className="divide-y">
          {assigneeSearchResult.map((assignee: any) => (
            <div
              key={assignee.id}
              className="p-4 my-1 hover:bg-muted/60 hover:cursor-pointer rounded-md"
              onClick={() => handleAssigneeSelect(assignee)}
            >
              <p className="font-semibold">{assignee.name}</p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {assignee.email}
              </p>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="w-full h-full flex justify-center items-center">
        <p className="dark:text-neutral-600 text-neutral-400">
          Start by searching the assignee
        </p>
      </div>
    );
  };

  const handleSubmit = async (values: FormData) => {
    try {
      const title = values.get("title");
      const description = values.get("description");
      if (!title || !description || !selectedAssignee || !selectedAssignee.id) {
        setError("Form incomplete");
        return;
      }

      const response = await fetch("/api/task", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          title,
          description,
          assignee: selectedAssignee.id,
          status: "todo",
          projectId,
        }),
      });
      const result = await response.json();
      if (result.error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Error signing up.",
          description: result.error,
        });
      } else {
        toast({
          title: "Task added successfully",
        });
        router.push(`/dashboard/project/${projectId}`);
      }
    } catch (err) {
      console.log(err);
      toast({
        variant: "destructive",
        title: "Uh oh! Error creating task.",
        description: "Check the task details",
      });
    }
  };

  const handleSelectedAssigneeRemove = (e: any) => {
    e.preventDefault();
    setSelectedAssignee(null);
  };

  return (
    <div className="flex flex-col flex-1">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/dashboard/project/${projectId}`}>
                Project {projectId}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Add Task</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {error && (
        <Alert variant="destructive" className="mt-2">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="flex w-full mt-6">
        <Form {...form}>
          <form className="space-y-8 w-full" action={handleSubmit}>
            <div className="grid grid-cols-2 gap-3 grid-row-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter task title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="row-span-2 place-items-start">
                <Label>Assignee</Label>
                {selectedAssignee ? (
                  <div className="p-4 my-1 rounded-md flex justify-between">
                    <div>
                      <p className="font-semibold">{selectedAssignee.name}</p>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        {selectedAssignee.email}
                      </p>
                    </div>
                    <Button
                      variant="destructive"
                      onClick={handleSelectedAssigneeRemove}
                    >
                      <XIcon className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div>
                    <div className="relative h-10 w-full mt-2">
                      <Search className="absolute w-4 h-4 left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10" />
                      <Input
                        type="text"
                        onChange={debouncedAssigneeSearch}
                        placeholder="Search for assignee by name"
                        className="pl-10 py-2 w-full focus:outline-none"
                      />
                    </div>
                    <div className="border border-dashed rounded-md mt-2 row-span-4 h-full flex flex-col overflow-scroll">
                      {getSearchResult()}
                    </div>
                  </div>
                )}
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter task description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="col-start-1">
                    <FormLabel className="mr-2">Status:</FormLabel>
                    <StatusBadge type="todo" />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="row-span-4 col-span-1">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
