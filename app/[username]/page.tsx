import type { Metadata, NextPage } from "next";
import Head from "next/head";
import React, { useMemo } from "react";
import { z } from "zod";
import { Button } from "../../components/Button/Button";
import { GradientBox } from "../../components/GradientBox";
import { DownloadIcon } from "../../icons/DownloadIcon";
import { RocketIcon } from "../../icons/RocketIcon";
import { CompositionProps } from "../../types/constants";
import { Actions } from "./Actions";
import { Player } from "./Player";
import styles from "./styles.module.css";

const wrapper: React.CSSProperties = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  backgroundImage: 'url("/background2.png")',
  backgroundPosition: "center",
  backgroundSize: "cover",
  position: "relative",
};

const content: React.CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const main: React.CSSProperties = {
  display: "flex",
  gap: 48,
};

const information: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: 24,
};

const title: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const downloadContent: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const videoSize: React.CSSProperties = {
  color: "rgba(211, 211, 211, 1)",
  fontSize: 14,
  fontWeight: 500,
};

type Props = { params: { username: string } };

const Home: NextPage<Props> = ({ params }) => {
  const inputProps: z.infer<typeof CompositionProps> = useMemo(() => {
    return {
      title: params.username,
    };
  }, [params.username]);

  return (
    <>
      <Head>
        <title>{`${params.username}'s #GitHubUnwrapped`}</title>
        <meta
          property="og:title"
          content={`${params.username}'s #GitHubUnwrapped`}
          key="title"
        />
        <meta name="description" content="Let's reflect on an eventful 2022!" />
        {/* TODO: update ogImage */}
        {/* <meta
          name="og:image"
          content={"https://ia.media-imdb.com/images/rock.jpg"}
        />
        <meta
          property="og:image"
          content={"https://ia.media-imdb.com/images/rock.jpg"}
        /> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@JNYBGR" />
        <meta
          name="twitter:title"
          content={`${params.username}'s #GitHubUnwrapped`}
        />
        <meta
          name="twitter:description"
          content="Let's reflect on an eventful 2022!"
        />
        <meta name="twitter:image" content="{ogImage}" />
      </Head>
      <div style={wrapper}>
        <div style={content}>
          <GradientBox>
            <div style={main}>
              <Player inputProps={inputProps} />
              <div style={information}>
                <div style={title}>
                  <h2 className={styles.gradientText} style={{ margin: 0 }}>
                    #GitHubUnwrapped 2023
                  </h2>
                  <h2 style={{ margin: 0 }}>@{params.username}</h2>
                </div>
                <div style={downloadContent}>
                  <Button
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 8,
                      alignItems: "center",
                      fontWeight: 700,
                    }}
                  >
                    Download Video <DownloadIcon width={20} color="white" />
                  </Button>
                  <div style={videoSize}>This MP4 has 11.4 MB.</div>
                </div>
                <Actions />
              </div>
            </div>
            <div className={styles.footer}>
              <RocketIcon />
              How we made Unwrapped
            </div>
          </GradientBox>
        </div>
      </div>
    </>
  );
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `${params.username}'s #GitHubUnwrapped`,
  };
}

export default Home;
