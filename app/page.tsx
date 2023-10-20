"use client";

import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { HomeLink } from "../components/HomeLink";
import { GithubIcon } from "../icons/GithubIcon";
import { RemotionIcon } from "../icons/RemotionIcon";
import { RocketIcon } from "../icons/RocketIcon";

const container: React.CSSProperties = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  backgroundImage: 'url("/background.png")',
  backgroundPosition: "center",
  backgroundSize: "cover",
};

const header: React.CSSProperties = {
  display: "flex",
  justifyContent: "flex-end",
  gap: 24,
  padding: "24px 56px 0",
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
        <div style={header}>
          <HomeLink
            icon={(props) => <RemotionIcon {...props} />}
            label={"Made with Remotion"}
            href={""}
          />
          <HomeLink
            href={""}
            label={"Source Code"}
            icon={(props) => <GithubIcon {...props} />}
          />
          <HomeLink
            href={""}
            label={"About Unwrapped"}
            icon={(props) => <RocketIcon {...props} />}
          />
        </div>
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
