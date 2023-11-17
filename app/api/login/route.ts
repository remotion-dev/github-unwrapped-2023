import { NextRequest, NextResponse } from "next/server";
import { credentials } from "../../../helpers/domain";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = credentials;

  var formdata = new FormData();
  formdata.append("client_id", CLIENT_ID);
  formdata.append("client_secret", CLIENT_SECRET);
  formdata.append("redirect_uri", REDIRECT_URI);
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
  })
    .then((res) => res.json())
    .catch((error) => {
      throw Error(error);
    });

  return NextResponse.json(userRes);
}
