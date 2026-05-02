import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { Providers } from "@/components/TanStackProvider/TanStackProvider";
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NoteSpace",
  description:
    "A compact notes manager that lets you create, view and organize your notes with ease.",
  openGraph: {
    title: "NoteSpace",
    description:
      "A compact notes manager that lets you create, view and organize your notes with ease.",
    url: "http://localhost:3000/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable} ${roboto.variable}`}>
      <body>
        <Providers>
          <Header />
          {children}
          {modal}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
