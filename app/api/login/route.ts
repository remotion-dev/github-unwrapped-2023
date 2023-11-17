import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const client_id = process.env.NEXT_PUBLIC_CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;
  const redirect_uri = process.env.NEXT_PUBLIC_REDIRECT_URI;

  if (!client_id || !client_secret || !redirect_uri) {
    throw Error("Missing environment variables");
  }

  var formdata = new FormData();
  formdata.append("client_id", "Iv1.f6c49a2f5df85ead");
  formdata.append("client_secret", "0a80c0531f58c16e039d2a3c1c002eece2aa2dde");
  formdata.append("redirect_uri", "http://localhost:3000/login");
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
