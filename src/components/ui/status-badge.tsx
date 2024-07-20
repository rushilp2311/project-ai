"use client";
import { useMemo } from "react";
import { Badge } from "./badge";
import { Task } from "@/types/Task";

export default function StatusBadge({
  type = "todo",
}: {
  type: Task["status"];
}) {
  const getBadgeClasses = useMemo(() => {
    if (type === "todo") {
      return "bg-neutral-600 dark:bg-neutral-800 dark:text-neutral-300 text-white hover:bg-neutral-600";
    } else if (type === "done") {
      return "bg-green-600 dark:bg-green-800 dark:text-green-300 text-white hover:bg-green-600";
    } else {
      return "bg-blue-600 dark:bg-blue-800 dark:text-blue-300 text-white hover:bg-blue-600";
    }
  }, [type]);

  const getStatusText = useMemo(() => {
    if (type === "todo") {
      return "To Do";
    } else if (type === "inprogress") {
      return "In Progress";
    } else {
      return "Done";
    }
  }, [type]);

  return (
    <Badge variant="default" className={getBadgeClasses}>
      {getStatusText}
    </Badge>
  );
}
