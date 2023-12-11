import type { Request, Response } from "express";
import { getEmailFromDb, saveEmailAdress } from "./db.js";
import { sendDiscordMessage } from "./discord.js";

const NOT_FOUND_TOKEN = "Not found";

export const emailEndpoint = async (req: Request, res: Response) => {
  if (req.method === "OPTIONS") return res.end();

  const email = req.body?.email;

  if (typeof email !== "string") {
    return res.status(400).json({ type: "error", error: "No email passed" });
  }

  try {
    const existingEmail = await getEmailFromDb(email);
    if (existingEmail) {
      return res.json({
        type: "success",
        message: "Your email has already been provided.",
      });
    }

    sendDiscordMessage(`New email submitted: ${email}`);
    await saveEmailAdress(email);
    return res
      .status(201)
      .json({ type: "success", message: "Your email has been saved!" });
  } catch (err) {
    console.log(err);
    if ((err as Error).message.includes(NOT_FOUND_TOKEN)) {
      return res.json({
        type: "error",
        error: "not-found",
      });
    }

    throw err;
  }
};
