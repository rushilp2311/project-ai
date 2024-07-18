"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { addComment } from "@/lib/comment-action";
import { getCurrentUser } from "@/lib/session";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CommentSection() {
  const params = useParams();
  const taskId = params["task-id"];
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState<any>();
  const [comments, setComments] = useState<any>([
    {
      id: 1,
      user: "Demo User",
      comment:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores suscipit obcaecati cum ut voluptatum expedita quisquam atque doloribus accusamus, distinctio, eveniet, est ex unde dolore cupiditate possimus! Quidem magnam facere velit illo cupiditate ipsum quos non aspernatur consectetur eveniet ad, sunt impedit beatae saepe? Nam ad architecto laudantium possimus optio?",
      created_at: new Date().toLocaleString(),
    },
    {
      id: 2,
      user: "Demo User",
      comment:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores suscipit obcaecati cum ut voluptatum expedita quisquam atque doloribus accusamus, distinctio, eveniet, est ex unde dolore cupiditate possimus! Quidem magnam facere velit illo cupiditate ipsum quos non aspernatur consectetur eveniet ad, sunt impedit beatae saepe? Nam ad architecto laudantium possimus optio?",
      created_at: new Date().toLocaleString(),
    },
    {
      id: 3,
      user: "Demo User",
      comment:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores suscipit obcaecati cum ut voluptatum expedita quisquam atque doloribus accusamus, distinctio, eveniet, est ex unde dolore cupiditate possimus! Quidem magnam facere velit illo cupiditate ipsum quos non aspernatur consectetur eveniet ad, sunt impedit beatae saepe? Nam ad architecto laudantium possimus optio?",
      created_at: new Date().toLocaleString(),
    },
  ]);

  const [comment, setComment] = useState<string>();

  const handlePostComment = async (e: any) => {
    e.preventDefault();
    try {
      await addComment({
        comment,
        user: currentUser.id,
        task: taskId,
      });

      setComments((prev: any) => [
        ...prev,
        {
          id: Math.random(),
          comment,
          created_at: new Date().toLocaleString(),
          user: currentUser.name,
        },
      ]);
      toast({
        title: "Comment added",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error posting comment",
        description: "Something went wrong while creating comment",
      });
    }
  };

  useEffect(() => {
    async function fetchCurrentUser() {
      const result = await getCurrentUser();
      setCurrentUser(result?.user);
    }

    fetchCurrentUser();
  }, []);

  return (
    <div className="ml-2">
      <div>
        <p className="text-lg font-semibold">Comments</p>
      </div>

      <div className="mt-3">
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add your comment..."
          className="w-2/3"
        />
        <Button size="sm" className="h-8 mt-2" onClick={handlePostComment}>
          Post
        </Button>
      </div>
      <Separator className="my-4" />
      <div className="divide-y space-y-3">
        {comments.map((comment: any) => (
          <div key={comment.id} className="text-sm bg-muted p-3">
            <p className="dark:text-neutral-300 text-neutral-600 font-semibold">
              {comment.user}
            </p>
            <p className="dark:text-neutral-400 text-neutral-500 font-semibold text-sm">
              {comment.created_at}
            </p>
            <p className="mt-2">{comment.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
