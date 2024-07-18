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
      return "bg-gray-600 dark:bg-gray-800 dark:text-white";
    } else if (type === "done") {
      return "bg-green-600 dark:bg-green-800 dark:text-green-300";
    } else {
      return "bg-blue-600 dark:bg-blue-800 dark:text-blue-300";
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
