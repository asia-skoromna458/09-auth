import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { Metadata } from "next";
type Props = {
  params: { slug: string[] };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug?.[0] || "all";

  const title =
    slug === "all" ? "All Notes – NoteSpace" : `${slug} Notes – NoteSpace`;

  const description =
    slug === "all"
      ? "Browse all notes in NoteSpace."
      : `Browse notes in the ${slug} category.`;

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
