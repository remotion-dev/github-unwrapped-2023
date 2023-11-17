import { Request, Response } from "express";
import { backendCredentials } from "../helpers/domain";
import { enableCors } from "./cors";

export const loginEndPoint = async (request: Request, response: Response) => {
  enableCors(response);
  if (request.method === "OPTIONS") return response.end();
  const body = request.body;

  const { CLIENT_SECRET } = backendCredentials();

  var formdata = new FormData();
  formdata.append("client_id", backendCredentials().NEXT_PUBLIC_CLIENT_ID);
  formdata.append("client_secret", CLIENT_SECRET);
  formdata.append(
    "redirect_uri",
    backendCredentials().NEXT_PUBLIC_REDIRECT_URI
  );
  formdata.append("code", body.code);

  const paramsString = await fetch(
    "https://github.com/login/oauth/access_token",
    {
      method: "POST",
      body: formdata,
      redirect: "follow",
    }
  ).then((res) => res.text());

  const params = new URLSearchParams(paramsString);
  const access_token = params.get("access_token");

  const userRes = await fetch(`https://api.github.com/user`, {
    headers: {
      Authorization: `token ${access_token}`,
    },
  });
  const json = await userRes.json();

  return response.json(json);
};
