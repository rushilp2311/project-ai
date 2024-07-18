"use client";

import StatusBadge from "@/components/ui/status-badge";
import { Task } from "@/types/Task";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "id",
    header: "Id",
    size: 50,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <p className="truncate text-ellipsis">{row.getValue("title")}</p>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",

    maxSize: 10,
    cell: ({ row }) => (
      <p className="truncate text-ellipsis">{row.getValue("description")}</p>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 90,
    cell: ({ row }) => <StatusBadge type={row.getValue("status")} />,
  },
  {
    accessorKey: "assignee_name",
    header: "Assignee",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
  },
];
