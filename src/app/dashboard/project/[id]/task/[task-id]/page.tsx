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
import { getCommentSummary, updateDescription } from "@/lib/ai-action";
import { getTaskById, updateTask } from "@/lib/task-action";
import { useToast } from "@/components/ui/use-toast";
import Markdown from "react-markdown";

export default function Task() {
  const params = useParams();

  const { toast } = useToast();

  const { id: projectId } = params;

  const taskId = params["task-id"];

  const [task, setTask] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  const [commentSummary, setCommentSummary] = useState<any>();

  const [comments, setComments] = useState<any>([]);

  useEffect(() => {
    setIsLoading(true);
    async function fetchTask() {
      if (!taskId) return <></>;
      const result = await getTaskById(taskId as string);
      setTask(result);
      setCommentSummary(result.comment_summary);
      setIsLoading(false);
    }
    fetchTask();
  }, [taskId]);

  if (!isLoading && !task) return <Loader />;

  const handleUpdateDescription = async () => {
    const result = await updateDescription(task.title, task.description);

    setTask((prev: any) => ({
      ...prev,
      description: result,
    }));

    // update task
    await updateTask(task, "nothing yet");

    toast({
      title: "Description updated with AI",
    });
  };

  const handleGenerateCommentSummary = async () => {
    try {
      const result = await getCommentSummary(comments);

      if (result) {
        setCommentSummary(result);
        await updateTask(task, result);
      }
    } catch (err) {
      throw err;
    }
  };

  const handleStatusUpdate = async (value: string) => {
    try {
      const updatedTask = {
        ...task,
        status: value,
      };

      setTask(updatedTask);

      await updateTask(
        {
          id: task.id,
          description: task.description,
          status: value,
        },
        commentSummary
      );

      toast({
        title: "Status updated",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error updating status",
      });
      throw err;
    }
  };

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
              <Button size="sm">
                <Bot className="w-4 h-4 mr-2" />
                Update with AI
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleUpdateDescription}>
                <FileText className="w-4 h-4 mr-2" />
                Update Description
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleGenerateCommentSummary}>
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
              <Markdown>{task?.description}</Markdown>
            </div>
          </div>

          {commentSummary && (
            <>
              <Separator className="my-5" />
              <div>
                <p className="font-semibold">Comment Summary</p>
                <Markdown className="p-2 border border-dashed rounded border-green-700 dark:bg-green-900 bg-green-50 text-green-800 dark:text-white ">
                  {commentSummary}
                </Markdown>
              </div>
            </>
          )}
          <Separator className="my-5" />
          <CommentSection comments={comments} setComments={setComments} />
        </div>
        <div className="border rounded-md h-fit px-3 py-2 space-y-3">
          <div className="space-y-2">
            <Label>Assignee</Label>
            <Input value={task?.assignee_name} />
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={task?.status} onValueChange={handleStatusUpdate}>
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
