import NoteForm from "@/components/NoteForm/NoteForm";
import { createNote } from "@/lib/api";
import { redirect } from "next/navigation";
import css from "./createNote.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create new notes",
  description:
    "Create a new note by adding a title, content, and choosing a tag to keep your notes organized.",
  openGraph: {
    title: "Create new notes",
    description:
      "Create a new note by adding a title, content, and choosing a tag to keep your notes organized.",
    url: "http://localhost:3000/notes/action/create",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};
const formAction = async (formData: FormData) => {
  "use server";

  const newNote = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    tag: formData.get("tag") as
      | "Todo"
      | "Work"
      | "Personal"
      | "Meeting"
      | "Shopping",
  };
  await createNote(newNote);
  redirect("/notes/filter/all");
};

export default function Page() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm formAction={formAction} />
      </div>
    </main>
  );
}
