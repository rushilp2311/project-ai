"use server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function updateDescription(title: string, description: string) {
  let result = "";

  const descriptionCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a project management AI which can update description of tasks and summarize the comment for easier read.",
      },
      {
        role: "user",
        content: `Update this description: ${description}. Here is the title of the task: ${title}. Add details if necessary and make sure that the summary should be under 100 words. Also the summary should be in Markdown format`,
      },
    ],
    model: "llama3-8b-8192",
    temperature: 1,
    max_tokens: 1024,
    top_p: 1,
    stream: true,
    stop: null,
  });

  for await (const chunk of descriptionCompletion) {
    result = result.concat(chunk.choices[0]?.delta?.content || "");
  }

  return result;
}

export async function getCommentSummary(comments: any) {
  if (!comments.length) return;

  let comment_string = "";

  let result = "";

  let list_counter = 1;
  for (const comment of comments) {
    const { comment: description, commenter } = comment;

    comment_string = comment_string.concat(
      ` ${list_counter}. ${description} by ${commenter}`
    );
    list_counter++;
  }

  const commentCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a project management AI which can update description of tasks and summarize the comment for easier read.",
      },
      {
        role: "user",
        content: `Based on the list of comments: ${comment_string}, generate summary in markdown format. The summary should be less than 100 words. Just include summary, don't repeat the comments itself`,
      },
    ],
    model: "llama3-8b-8192",
    temperature: 1,
    max_tokens: 1024,
    top_p: 1,
    stream: true,
    stop: null,
  });

  for await (const chunk of commentCompletion) {
    result = result.concat(chunk.choices[0]?.delta?.content || "");
  }

  return result;
}
