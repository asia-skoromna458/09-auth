"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { checkSession, getMe, logout } from "@/lib/api/serverApi";
import { useAuthStore } from "@/lib/store/authStore";

const PUBLIC_ROUTES = ["/sign-in", "/sign-up"];
const PRIVATE_ROUTES = ["/profile", "/notes"];

type Props = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const [loading, setLoading] = useState(true);

  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);
  const clearIsAuthed = useAuthStore((state) => state.clearIsAuthenticated);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const verify = async () => {
      const isAuthed = await checkSession();

      if (isAuthed) {
        const user = await getMe();
        if (user) setUser(user);

        if (PUBLIC_ROUTES.includes(pathname)) {
          router.replace("/profile");
        }
      } else {
        clearUser();
        clearIsAuthed();

        if (PRIVATE_ROUTES.includes(pathname)) {
          await logout();
          router.replace("/sign-in");
          return;
        }
      }

      setLoading(false);
    };

    verify();
  }, [pathname, router, setUser, clearUser, clearIsAuthed]);

  if (loading) return <div>Loading...</div>;

  return children;
}
