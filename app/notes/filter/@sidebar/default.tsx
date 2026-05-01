import Link from "next/link";
import css from "./SidebarNotes.module.css";

const tags = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function NotesSidebar({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const query = new URLSearchParams(
    Object.entries(searchParams).reduce(
      (acc, [key, value]) => {
        if (typeof value === "string") acc[key] = value;
        return acc;
      },
      {} as Record<string, string>,
    ),
  ).toString();

  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link
          href={`/notes/filter/all${query ? `?${query}` : ""}`}
          className={css.menuLink}
        >
          All notes
        </Link>
      </li>

      {tags.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link
            href={`/notes/filter/${tag}${query ? `?${query}` : ""}`}
            className={css.menuLink}
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
