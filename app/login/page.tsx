"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const login = async (code: string) => {
  const res = await fetch("http://localhost:3000/api/login", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      code,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to login");
  }

  return await res.json();
};

const LoginRedirectPage = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const router = useRouter();

  useEffect(() => {
    const effectLogin = async () => {
      if (code) {
        const user = await login(code);
        router.push(`/${user.login}`);
      }
    };
    effectLogin();
  }, [code, router]);

  if (!code) {
    return <div>authentication failed</div>;
  }

  return <div>logging in...</div>;
};

export default LoginRedirectPage;
