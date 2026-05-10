//серверні версії всіх запитів з кукі і фетч
import { Api } from "./api";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";

export interface NoteResponse{
  totalPages: number
  notes: Note[]

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

//DETAILS

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await Api.get<Note>(`/notes/${id}`);
  return res.data 
}

//checkSession
type checkSessionRequest = {
  success: boolean
}
export const checkSession = async () => {
  const res = await Api.get<checkSessionRequest>('/auth/session')
  return res.data.success
}

export const getMe = async () => {
  const { data } = await Api.get<User>('/user/me')
  return data
}


//logout
export const logout = async (): Promise<void> => {
  await Api.post('/auth/logout');
};

export const updateUser = async (body:{username: string}) => {
  const res = await Api.post<User>('/user/me', body)
  return res.data
}