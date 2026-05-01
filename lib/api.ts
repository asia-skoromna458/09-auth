import type { Note } from "../types/note";
import axios from "axios";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common["Authorization"] = `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`
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

  const res = await axios.get("/notes", { params });
  return res.data;
};


// CREATE
export interface NewNote {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}


export const createNote = async (newNote: NewNote):Promise<Note> => {
  const res = await axios.post<Note>("/notes", newNote);
  return res.data;
};

// DELETE
export const deleteNote = async (noteId: string):Promise<Note> => {
  const res = await axios.delete<Note>(`/notes/${noteId}`);
  return res.data;
};

//DETAILS

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await axios.get<Note>(`/notes/${id}`);
  return res.data 
}