
import type { Note, User } from "../../types/note";
import { Api } from "./api";




// CREATE
export interface NewNote {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}


export const createNote = async (newNote: NewNote):Promise<Note> => {
  const res = await Api.post<Note>("/notes", newNote);
  return res.data;
};

// DELETE
export const deleteNote = async (noteId: string):Promise<Note> => {
  const res = await Api.delete<Note>(`/notes/${noteId}`);
  return res.data;
};



//register

export interface RegisterRequest{
  email: string
  password: string


}
export const register = async (data: RegisterRequest) => {
  const res = await Api.post<User>("/auth/register", data)
  return res.data
}

//login
export type LoginRequest = {
  email: string;
  password: string;
};
export const login = async (data: LoginRequest) => {
  const res = await Api.post<User>('/auth/login', data)
  return res.data
}

