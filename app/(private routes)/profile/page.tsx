import type { Metadata } from "next";
import ProfileClient from "./ProfileClient/ProfileClient";
import { getMeServer } from "@/lib/api/serverApi";
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

export default async function ProfilePage() {
  const user = await getMeServer();

  return <ProfileClient user={user} />;
}
