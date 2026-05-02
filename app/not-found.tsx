import css from "./not-found.module.css";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "NotFound",
  description:
    "This page cannot be found. It is no longer available or supported within NoteSpace.",
  openGraph: {
    title: "Page not found",
    description:
      "This page cannot be found. It is no longer available or supported within NoteSpace.",
    url: "https://localhost:3000/not-found",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

export default function NotFound() {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
