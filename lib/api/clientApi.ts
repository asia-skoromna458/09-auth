
import type { Note } from "../../types/note";
import type { User } from "@/types/user";
import { Api } from "./api";


export interface NoteResponse{
  totalPages: number
  notes: Note[]

}

type checkSessionRequest = {
  success: boolean
}

export const checkSession = async () => {
  const res = await Api.get<checkSessionRequest>('/auth/session')
  return res.data.success
}


//logout
export const logout = async (): Promise<void> => {
  await Api.post('/auth/logout');
};

export const updateUser = async (body:{username: string}) => {
  const res = await Api.patch<User>('/users/me', body)
  return res.data
}

export const getMe = async () => {
  const { data } = await Api.get<User>('/users/me')
  return data
}


export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await Api.get<Note>(`/notes/${id}`);
  return res.data 
}
// GET
export const fetchNotes = async (
  page = 1,
  perPage = 12,
  search = "",
  tag?: string
) => {
  const params: Record<string, string | number> = { page, perPage };

  if (search.trim() !== "") params.search = search;
  if (tag && tag !== "all") params.tag = tag;

  const res = await Api("/notes", { params });
  return res.data;
};


// CREATE
export interface NewNote {
  title: string;
  content: string;
  tag: Note["tag"];
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

