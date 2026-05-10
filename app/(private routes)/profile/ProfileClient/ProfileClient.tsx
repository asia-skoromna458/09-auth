"use client";

import Image from "next/image";
import css from "../ProfilePage.module.css";
import { getMe } from "@/lib/api/serverApi";
import { useEffect, useState } from "react";
import type { User } from "@/types/user";
import Link from "next/link";

export default function ProfileClient() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getMe().then(setUser);
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>

        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </div>
  );
}
