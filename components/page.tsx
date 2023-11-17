"use client";

import { useCallback, useEffect } from "react";
import { frontendCredentials } from "../helpers/domain";

const login = async (code: string) => {
  const res = await fetch(`${frontendCredentials().VITE_API_URL}/api/login`, {
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

  return res.json();
};

const LoginRedirectPage = () => {
  const code = new URLSearchParams(window.location.search).get("code");

  const doLogin = useCallback(async () => {
    if (code) {
      const user = await login(code);
      window.location.href = `/${user.login}`;
    }
  }, [code]);

  useEffect(() => {
    doLogin();
  }, [code, doLogin]);

  if (!code) {
    return <div>authentication failed</div>;
  }

  return <div>logging in...</div>;
};

export default LoginRedirectPage;
