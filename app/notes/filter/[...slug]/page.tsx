import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { Metadata } from "next";
type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const currentSlug = slug?.[0] || "all";

  const title =
    currentSlug === "all"
      ? "All Notes – NoteSpace"
      : `${currentSlug} Notes – NoteSpace`;

  const description =
    currentSlug === "all"
      ? "Browse all notes in NoteSpace."
      : `Browse notes in the ${currentSlug} category.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `http://localhost:3000/notes/filter/${slug}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        },
      ],
    },
  };
}
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
