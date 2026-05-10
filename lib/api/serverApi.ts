import { Api } from "./api";
import { cookies } from "next/headers";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";

const getCookieHeader = async () => {
  const cookieStore = await cookies();

  return cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");
};

// SERVER: fetch notes
export const fetchNotesServer = async (params: {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}): Promise<{ totalPages: number; notes: Note[] }> => {
  const res = await Api.get("/notes", {
    params,
    headers: { Cookie: await getCookieHeader() },
  });

  return res.data;
};

// SERVER: fetch note by id
export const fetchNoteByIdServer = async (id: string): Promise<Note> => {
  const res = await Api.get(`/notes/${id}`, {
    headers: { Cookie: await getCookieHeader() },
  });

  return res.data;
};

// SERVER: check session
export const checkSessionServer = async () => {
  const res = await Api.get("/auth/session", {
    headers: { Cookie: await getCookieHeader() },
  });

  return res.data;
};

// SERVER: get current user
export const getMeServer = async (): Promise<User> => {
  const res = await Api.get("/users/me", {
    headers: { Cookie: await getCookieHeader() },
  });

  return res.data;
};

// SERVER: update user
export const updateUserServer = async (body: { username: string }) => {
  const res = await Api.patch("/users/me", body, {
    headers: { Cookie: await getCookieHeader() },
  });

  return res; 
};


// SERVER: logout
export const logoutServer = async (): Promise<void> => {
  await Api.post("/auth/logout", null, {
    headers: { Cookie: await getCookieHeader() },
  });
};



