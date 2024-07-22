"use client";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { addComment, getCommentByTaskId } from "@/lib/comment-action";
import { getCurrentUser } from "@/lib/session";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CommentSection({ comments, setComments }: any) {
  const params = useParams();
  const taskId = params["task-id"];
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(true);

  const [currentUser, setCurrentUser] = useState<any>();

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

  const getCommentsComponent = () => {
    if (isLoading) return <Loader />;
    if (isError)
      return (
        <div className="border border-red-700 rounded dark:bg-red-600 bg-red-500 text-white p-4">
          Error getting comments for this task. Try refreshing the page
        </div>
      );
    if (!comments || (comments && comments.length < 1))
      return <>No comments yet</>;

    return comments.map((comment: any) => (
      <div key={comment.id} className="text-sm rounded bg-muted p-3 my-2">
        <p className="dark:text-neutral-300 text-neutral-600 font-semibold">
          {comment.commenter}
        </p>
        <p className="dark:text-neutral-400 text-neutral-500 font-semibold text-sm">
          {comment.created_at.toLocaleString()}
        </p>
        <p className="mt-2">{comment.comment}</p>
      </div>
    ));
  };

  useEffect(() => {
    async function fetchCurrentUser() {
      const result = await getCurrentUser();
      setCurrentUser(result?.user);
    }
    async function fetchComments() {
      try {
        setIsError(false);
        if (!taskId) return;
        const result = await getCommentByTaskId(taskId as string);
        setComments(result);
      } catch (err) {
        console.error(err);
        setIsError(true);
      }
    }

    setIsLoading(true);
    fetchCurrentUser();
    fetchComments();
    setIsLoading(false);
  }, [taskId]);

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
      {getCommentsComponent()}
    </div>
  );
}
