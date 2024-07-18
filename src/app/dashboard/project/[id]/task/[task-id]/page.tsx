"use client";
import { Bot, ChevronDown, MessageSquareText, FileText } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import Loader from "@/components/ui/loader";
import CommentSection from "./comment";
export default function Task() {
  const params = useParams();

  const { id: projectId } = params;

  const taskId = params["task-id"];

  const [task, setTask] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function fetchTask() {
      if (!taskId) return <></>;
      // const result = await getTaskById(taskId as string);
      setTask({});
      setIsLoading(false);
    }
    fetchTask();
  }, [taskId]);

  if (!isLoading && !task) return <Loader />;

  return (
    <div className="flex flex-col flex-1">
      <div className="flex justify-between items-center flex-1">
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
              <BreadcrumbPage>Task {params["task-id"]}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                size="sm"
                className=" dark:text-white bg-blue-600 hover:bg-blue-700"
              >
                <Bot className="w-4 h-4 mr-2" />
                Update with AI
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <FileText className="w-4 h-4 mr-2" />
                Update Description
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <MessageSquareText className="w-4 h-4 mr-2" />
                Generate comment summary
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 h-full mt-6">
        <div className="col-span-3 overflow-y-auto">
          <div>
            <p className="text-2xl font-semibold">{task?.title}</p>

            <div className="border px-4 py-3 rounded-md mt-2">
              <p>{task?.description}</p>
            </div>
          </div>
          <Separator className="my-5" />
          {/* Comments */}
          <CommentSection />
        </div>
        <div className="border rounded-md h-fit px-3 py-2 space-y-3">
          <div className="space-y-2">
            <Label>Assignee</Label>
            <Input value={task?.assignee_name} />
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={task?.status}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="todo">Todo</SelectItem>
                  <SelectItem value="inprogress">In Progress</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
