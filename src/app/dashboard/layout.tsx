import Link from "next/link";
import { CircleUser, LogOut } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";

import Logo from "../../../public/logo.svg";
import { signOut } from "@/auth";
import DarkModeToggle from "@/components/ui/dark-mode";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen w-full ">
      <div className="flex flex-col">
        <header className="flex h-14 container justify-between items-center  border-b lg:h-[60px]">
          <div className=" flex h-14 items-center">
            <Link href="/" className="flex items-center justify-start h-[14px]">
              <Image src={Logo} height={150} width={150} alt="logo" />
            </Link>
          </div>
          <div className="flex items-center">
            <DarkModeToggle />
            <div className="ml-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                  >
                    <CircleUser className="h-5 w-5" />
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <form
                      className="w-full"
                      action={async () => {
                        "use server";
                        await signOut({ redirectTo: "/" });
                      }}
                    >
                      <Button variant="ghost" className="h-2 p-0 m-0">
                        <LogOut className="w-4 h-4 mr-2" /> Logout
                      </Button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        <main className="container flex flex-1 lg:p-6 h-full overflow-scroll">
          {children}
        </main>
      </div>
    </div>
  );
}
