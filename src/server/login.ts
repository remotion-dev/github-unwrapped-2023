import type { Request, Response } from "express";
import { z } from "zod";
import {
  backendCredentials,
  makeRedirectUriBackend,
} from "../helpers/domain.js";

export const loginEndPoint = async (request: Request, response: Response) => {
  if (request.method === "OPTIONS") return response.end();
  const query = z
    .object({
      code: z.string(),
    })
    .parse(request.query);

  const { CLIENT_SECRET, VITE_CLIENT_ID } = backendCredentials();

  const formdata = new FormData();
  formdata.append("client_id", VITE_CLIENT_ID);
  formdata.append("client_secret", CLIENT_SECRET);
  formdata.append("redirect_uri", makeRedirectUriBackend());
  formdata.append("code", query.code);

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

  const userData = z
    .object({
      login: z.string(),
    })
    .parse(json);

  return response.redirect(`/${userData.login}`);
};
