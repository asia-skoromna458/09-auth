import Image from "next/image";
import css from "./ProfilePage.module.css";
import { Metadata } from "next";
import { getMe } from "@/lib/clientApi";

export const metadata: Metadata = {
  title: "Profile – NoteHub",
  description: "User profile page with account information.",
  openGraph: {
    title: "Profile – NoteHub",
    description: "User profile page with account information.",
    url: "https://09-auth-wheat-gamma.vercel.app/profile",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      },
    ],
  },
};
export default async function Profile() {
  const User = await getMe();
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <a href="" className={css.editProfileButton}>
            Edit Profile
          </a>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={User.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {User.username}</p>
          <p>Email: {User.email}</p>
        </div>
      </div>
    </main>
  );
}
