import { decode } from "js-base64";
import moment from "moment-timezone";
import jwt from "jsonwebtoken";

export async function get({ data }) {
  let meetup: MeetupType;
  try {
    meetup = JSON.parse(decode(data));
  } catch {
    return new Response(null, {
      status: 404,
      statusText: "Not found",
    });
  }

  const token = jwt.sign(
    {
      token_id: "1",
      url: "https://meetup.day/og",
      h: 1000,
      w: 1500,
      params: {
        title: meetup.title || "404 - Page not found",
        date:
          new Date(meetup.from * 1000).toDateString() +
            ", " +
            moment(meetup.from * 1000)
              .tz("UTC")
              .format("HH.mm") +
            " UTC" || "",
      },
    },
    process.env.IMAGE_API_KEY
  );

  return new Response("", {
    status: 302,
    headers: {
      location: `https://img.alexander.sbs/v1/image?t=${token}`,
    },
  });
}
