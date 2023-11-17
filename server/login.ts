import type { Request, Response } from "express";
import { backendCredentials } from "../helpers/domain";
import { enableCors } from "./cors";

export const loginEndPoint = async (request: Request, response: Response) => {
  enableCors(response);
  if (request.method === "OPTIONS") return response.end();
  const { body } = request;

  const { CLIENT_SECRET, NEXT_PUBLIC_CLIENT_ID, NEXT_PUBLIC_REDIRECT_URI } =
    backendCredentials();

  const formdata = new FormData();
  formdata.append("client_id", NEXT_PUBLIC_CLIENT_ID);
  formdata.append("client_secret", CLIENT_SECRET);
  formdata.append("redirect_uri", NEXT_PUBLIC_REDIRECT_URI);
  formdata.append("code", body.code);

  const paramsString = await fetch(
    "https://github.com/login/oauth/access_token",
    {
      method: "POST",
      body: formdata,
      redirect: "follow",
    }
  );

  const params = new URLSearchParams(await paramsString.text());

  const access_token = params.get("access_token");

  const userRes = await fetch(`https://api.github.com/user`, {
    headers: {
      Authorization: `token ${access_token}`,
    },
  });
  const json = await userRes.json();

  return response.json(json);
};
