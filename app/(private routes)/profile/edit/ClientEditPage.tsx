"use client";

import Image from "next/image";
import css from "./EditProfilePage.module.css";
import { useState } from "react";
import { updateUser } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";

export default function ClientEditPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const updated = await updateUser({ username });

      if (updated) {
        setUser(updated);

        router.push("/profile");
      }
    } catch {
      setError("Failed to update profile");
    }
  };

  return (
    <div className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src="avatar"
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {error && <p className={css.error}>{error}</p>}

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.push("/profile")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
