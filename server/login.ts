import type { Request, Response } from "express";
import { backendCredentials } from "../helpers/domain";
import { enableCors } from "./cors";

export const loginEndPoint = async (request: Request, response: Response) => {
  enableCors(response);
  if (request.method === "OPTIONS") return response.end();
  const { body } = request;

  const { CLIENT_SECRET, VITE_CLIENT_ID, VITE_REDIRECT_URI } =
    backendCredentials();

  const formdata = new FormData();
  formdata.append("client_id", VITE_CLIENT_ID);
  formdata.append("client_secret", CLIENT_SECRET);
  formdata.append("redirect_uri", VITE_REDIRECT_URI);
  formdata.append("code", body.code);

  const paramsString = await fetch(
    "https://github.com/login/oauth/access_token",
    {
      method: "POST",
      body: formdata,
      redirect: "follow",
    }
  );

  const paramsStringText = await paramsString.text();

  const params = new URLSearchParams(paramsStringText);

  const access_token = params.get("access_token");

  const userRes = await fetch(`https://api.github.com/user`, {
    headers: {
      Authorization: `token ${access_token}`,
    },
  });
  const json = await userRes.json();
  console.log({ json, paramsStringText, body });

  return response.json(json);
};
