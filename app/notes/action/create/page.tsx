import NoteForm from "@/components/NoteForm/NoteForm";
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
    images: [
      { url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg" },
    ],
  },
};

export default function Page() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
