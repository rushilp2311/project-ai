export type Task = {
  id: string;
  title: string;
  description: string;
  status: "todo" | "inprogress" | "done";
  dueDate: string;
  assignee: string;
  created_at: string;
};
