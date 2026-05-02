"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import css from "./page.module.css";
import { useState } from "react";
import NoteList from "@/components/NoteList/NoteList";
import { fetchNotes } from "@/lib/api";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type NotesClientProps = {
  tag: string;
};

export default function NotesClient({ tag }: NotesClientProps) {
  const searchParams = useSearchParams();
  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const searchFromUrl = searchParams.get("search") || "";

  const [search, setSearch] = useState(searchFromUrl);
  const [page, setPage] = useState(pageFromUrl);

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 300);

  const { data, isLoading } = useQuery({
    queryKey: ["notes", search, page, tag],
    queryFn: () =>
      tag === "all"
        ? fetchNotes(page, 12, search)
        : fetchNotes(page, 12, search, tag),
    placeholderData: keepPreviousData,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} value={search} />

        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}

        <Link href="/notes/action/create" className="button">
          Create note +
        </Link>
      </header>

      {isLoading && <p>Loading...</p>}

      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}
