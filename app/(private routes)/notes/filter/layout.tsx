import css from "./layout.module.css";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  sidebar: React.ReactNode;
};

export default function NotesFilterLayout({ children, sidebar }: Props) {
  return (
    <section className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>

      <div className={css.notesWrapper}>{children}</div>
    </section>
  );
}
