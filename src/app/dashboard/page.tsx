import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
        <Link href="/dashboard/add-project">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>
        </Link>
      </div>
      <div className="px-5 py-6 h-fit flex flex-1 items-center justify-center rounded-lg border border-neutral-600 mt-5 border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no projects
          </h3>
          <p className="text-sm text-muted-foreground">
            Start by creating a project from top right.
          </p>
        </div>
      </div>
    </div>
  );
}
