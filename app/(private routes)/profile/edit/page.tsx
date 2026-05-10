"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { updateUser, getMe } from "@/lib/api/clientApi";
import css from "./EditProfilePage.module.css";
import { useEffect, useState } from "react";
import { User } from "@/types/user";

export default function EditPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState("");
  useEffect(() => {
    getMe().then((data) => {
      setUser(data);
      setUsername(data.username);
    });
  }, []);

  const updateValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    await updateUser({ username });

    router.push("/profile");
  };
  const handleCancel = () => {
    router.push("/profile");
  };

  if (!user) return <p>Loading...</p>;
  return (
    <div className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user.avatar}
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
              value={username}
              className={css.input}
              onChange={updateValue}
            />
          </div>

          <p>Email: {user.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
