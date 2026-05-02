import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Filtered Notes - NoteSpace",
  description:
    "View notes filtered by category. Browse, read and manage notes based on the selected tag.",
  openGraph: {
    title: "Filtered Notes - NoteSpace",
    description:
      "View notes filtered by category. Browse, read and manage notes based on the selected tag.",
    url: "http://localhost:3000/notes/filter/all",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

export default async function NotesPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const tag = slug?.[0] ?? "all";
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", tag, 1],
    queryFn: () => fetchNotes(1, 12, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
