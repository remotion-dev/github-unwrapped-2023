"use client";

import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { Button } from "../components/Button/Button";
import buttonStyles from "../components/Button/styles.module.css";
import { HomeLink } from "../components/HomeLink";
import { Input } from "../components/Input/Input";
import { GithubIcon } from "../icons/GithubIcon";
import { RemotionIcon } from "../icons/RemotionIcon";
import { RocketIcon } from "../icons/RocketIcon";
import { GradientBox } from "./GradientBox";
import { UserNotFound } from "./UserNotFound";

const container: React.CSSProperties = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  backgroundImage: 'url("/background.png")',
  backgroundPosition: "center",
  backgroundSize: "cover",
  position: "relative",
};

const header: React.CSSProperties = {
  display: "flex",
  justifyContent: "flex-end",
  top: 0,
  left: 0,
  width: "100%",
  gap: 24,
  padding: "24px 56px 0",
  position: "absolute",
};

const player: React.CSSProperties = {
  width: 720,
  borderRadius: 20,
  padding: 24,
};

const content: React.CSSProperties = {
  flex: 1,
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const title: React.CSSProperties = {
  margin: 0,
  padding: 0,
  marginBottom: 16,
  fontSize: 36,
  fontWeight: 700,
  color: "white",
};

const inputContainer: React.CSSProperties = {
  width: "100%",
  paddingTop: "auto",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const buttonContainer: React.CSSProperties = {
  display: "flex",
};

const octocat: React.CSSProperties = {
  position: "absolute",
  bottom: -296 + 64,
  left: 0,
  right: 0,
  margin: "0 auto",
  height: 296,
};

const Home: NextPage = () => {
  const [username, setUsername] = useState<string>("");
  const [userNotFound, setUserNotFound] = useState<boolean>(false);
  const router = useRouter();

  const handleClick: React.FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      fetch(`https://api.github.com/users/${username}`)
        .then((response) => response.json())
        .then((result) => {
          if (result.message === "Not Found") {
            setUserNotFound(true);
          } else {
            setUserNotFound(false);
            router.push(username);
          }
        })
        .catch((error) => console.log("error", error));
    },
    [router, username]
  );

  return (
    <div style={container}>
      <style jsx>{`
        .gradient-text {
          background: linear-gradient(270.02deg, #c0b1e5 3.63%, #c5be81 99.87%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        h2 {
          font-size: 24px;
          padding: 0;
          margin: 0;
          margin-bottom: 32px;
        }
      `}</style>
      <div style={header}>
        <HomeLink
          icon={(props) => <RemotionIcon {...props} />}
          label={"Made with Remotion"}
          href={"https://remotion.dev"}
        />
        <HomeLink
          href={"https://github.com/remotion-dev/github-unwrapped-2023"}
          label={"Source Code"}
          icon={(props) => <GithubIcon {...props} />}
        />
        <HomeLink
          href={"https://github.com/remotion-dev/github-unwrapped-2023"}
          label={"About Unwrapped"}
          icon={(props) => <RocketIcon {...props} />}
        />
      </div>
      <div style={content}>
        <GradientBox style={{ width: 760, height: 360 }}>
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h2 className="gradient-text">#GitHubUnwrapped 2023</h2>
            <h1 style={title}>Unlock your coding year in review</h1>
            <p>Get a personalized video of your GitHub activity in 2023.</p>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 48,
              width: "calc(100% - 80px)",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {userNotFound && <UserNotFound />}
            <div style={inputContainer}>
              <form style={buttonContainer} onSubmit={handleClick}>
                <Input
                  text={username}
                  placeHolder="Username"
                  setText={(s) => setUsername(s)}
                  invalid={userNotFound}
                  style={{
                    borderRadius: "5px 0 0 5px",
                    width: 250,
                  }}
                />
                <Button style={{ borderRadius: "0 5px 5px 0" }}>
                  Start Unwrapped
                </Button>
              </form>

              <div>or</div>
              <Link
                style={{ textDecoration: "none" }}
                className={buttonStyles.secondarybutton}
                href={`https://github.com/login/oauth/authorize?scope=user&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}`}
              >
                Sign in with GitHub
              </Link>
            </div>
          </div>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          {userNotFound ? (
            <img src="/sad-octocat.svg" alt="Octocat" style={octocat} />
          ) : (
            <img src="/octocat.svg" alt="Octocat" style={octocat} />
          )}
        </GradientBox>
      </div>
    </div>
  );
};

export default Home;
