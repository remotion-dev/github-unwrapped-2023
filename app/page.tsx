"use client";

import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const container: React.CSSProperties = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const player: React.CSSProperties = {
  width: 720,
  borderRadius: 20,
  padding: 24,
};

const Home: NextPage = () => {
  const [username, setUsername] = useState<string>("");
  const router = useRouter();

  return (
    <div>
      <div style={container}>
        <div className="cinematics" style={player}>
          <h1>Your coding year in review</h1>
          <p>
            Get a personalized video of your GitHub activity in 2023. Type your
            username to get started!
          </p>
          <input
            type="text"
            value={username}
            placeholder="Your GitHub username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={() => router.push(username)}>
            Get your unwrapped
          </button>
          <div>or</div>
          <Link
            href={`https://github.com/login/oauth/authorize?scope=user&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}`}
          >
            Login with GitHub
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
