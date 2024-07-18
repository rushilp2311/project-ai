import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { Plus, Save, Search } from "lucide-react";
import { debounce } from "lodash";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { projectSchema } from "@/util/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { auth } from "@/auth";
import { addProject } from "@/lib/project-action";

export default async function AddProject() {
  //   const [owner, setOwner] = useState();

  //   const [ownerSearchResult, setOwnerSearchResult] = useState<any>();

  //   const debouncedOwnerSearch = useMemo(() => {
  //     return debounce(handleOwnerSearch, 400);
  //   }, []);

  //   async function handleOwnerSearch(event: any) {
  //     try {
  //       const result = await fetch(
  //         `/api/user?searchType=fuzzySearch&searchText=${event.target.value}`
  //       );
  //       const { data } = await result.json();
  //       setOwnerSearchResult(data);
  //     } catch (err) {
  //       toast({
  //         variant: "destructive",
  //         title: "Error searching owner",
  //       });
  //     }
  //   }

  //   function addOwnerDialog() {
  //     return (
  //       <Dialog>
  //         <DialogTrigger asChild>
  //           <Button variant="outline">
  //             <Plus className="mr-2 h-4 w-4" />
  //             Add Owner
  //           </Button>
  //         </DialogTrigger>
  //         <DialogContent className="sm:max-w-[425px]">
  //           <DialogHeader>
  //             <DialogTitle>Add project owner</DialogTitle>
  //             <DialogDescription>
  //               Search the owner by name and add it to project.
  //             </DialogDescription>
  //           </DialogHeader>
  //           <div className="py-4">
  //             <div className="flex flex-col">
  //               <Label htmlFor="name" className="">
  //                 Name
  //               </Label>
  //               <div className="relative h-10 w-full mt-3">
  //                 <Search className="absolute w-4 h-4 left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10" />
  //                 <Input
  //                   type="text"
  //                   onChange={debouncedOwnerSearch}
  //                   placeholder="Enter your comment here"
  //                   className="pl-10 py-2 w-full focus:outline-none"
  //                 />
  //               </div>

  //               <div className="mt-5 px-6 flex justify-center items-center py-5 border dark:border-neutral-700 rounded border-dashed">
                  // {ownerSearchResult ? (
                  //   ownerSearchResult.map((owner: any) => (
                  //     <p key={owner.id}>{owner.name}</p>
                  //   ))
                  // ) : (
                  //   <p className="text-neutral-500 text-balance">
                  //     No result to display. Start searching or update the search
                  //     text.
                  //   </p>
                  // )}
  //               </div>
  //             </div>
  //           </div>
  //           <DialogFooter>
  //             <Button type="submit">Add owner</Button>
  //           </DialogFooter>
  //         </DialogContent>
  //       </Dialog>
  //     );
  //   }

  return (
    <div className="flex flex-col flex-1">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Add Project</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* ----------- */}
      <div className="flex items-center justify-center mt-10">
        <form className="w-1/2 space-y-4" action={addProject}>
          <div className="space-y-1">
            <Label>Name*</Label>
            <Input
              required
              name="name"
              id="name"
              placeholder="Enter project name"
            />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Input
              name="description"
              id="description"
              placeholder="Enter project name"
            />
          </div>
          <div className="space-y-2">
            <Label>Owner</Label>
            <p>You will be the owner of the project</p>
          </div>

          <Button className="w-full">Create Project</Button>
        </form>
      </div>
    </div>
  );
}
