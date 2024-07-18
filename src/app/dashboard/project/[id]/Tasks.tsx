"use client";
import {
  Check,
  ChevronsUpDown,
  File,
  ListFilter,
  PlusCircle,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Task } from "@/types/Task";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { taskSchema } from "@/util/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@/types/User";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { getTasks } from "@/lib/task-action";
import { useParams } from "next/navigation";
import Loader from "@/components/ui/loader";

export default function Tasks() {
  const [tasks, setTasks] = useState<any>([]);
  const { id: projectId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    async function fetchTasks() {
      const result = await getTasks(projectId as string);

      setTasks(result);
      setIsLoading(false);
    }
    fetchTasks();
  }, []);

  return (
    <div className="flex flex-col sm:gap-4 mt-4">
      <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
        <div className="flex items-center"></div>
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Tasks</CardTitle>
            <CardDescription>Manage your tasks.</CardDescription>
            <div className="ml-auto flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Filter
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>
                    Active
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="sm" variant="outline" className="h-8 gap-1">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Export
                </span>
              </Button>
              <Link href="/dashboard/project/1/task/add">
                <Button size="sm" className="h-8 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Tasks
                  </span>
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center">
                <Loader />
              </div>
            ) : (
              <DataTable columns={columns} data={tasks} />
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
