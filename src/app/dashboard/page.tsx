import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { getAllProjectsForCurrentOwner } from "@/lib/project-action";
import { Plus, ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function Dashboard() {
  const projects = await getAllProjectsForCurrentOwner({
    forDashboard: true,
    includeAllCount: true,
  });

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
      {projects ? (
        <div className="mt-10">
          {projects.allCount && projects?.allCount > 6 && (
            <div className="flex items-center justify-end">
              <Button variant="link">
                View All <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          )}
          <div className="grid mt-2 gap-x-3 gap-y-6 grid-cols-3 grid-rows-2">
            {projects?.data.map((project) => (
              <Link key={project.id} href={`/dashboard/project/${project.id}`}>
                <div className="row-span-1 border group rounded-md cursor-pointer hover:dark:bg-gray-800 hover:bg-neutral-100">
                  <div className="px-10 py-5">
                    <p className="font-bold text-lg">{project.name}</p>
                    <p className="dark:text-neutral-400">
                      {project.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="px-5 py-6 h-fit flex flex-1 items-center justify-center rounded-lg border mt-5 border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You have no projects
            </h3>
            <p className="text-sm text-muted-foreground">
              Start by creating a project from top right.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
