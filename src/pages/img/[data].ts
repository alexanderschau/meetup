import { decode } from "js-base64";
import moment from "moment-timezone";

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

  const resp = await fetch(
    `https://img.alexander.sbs/v1/image?tkn=${
      process.env.IMAGE_API_KEY
    }&url=https://meetup.day/og&h=1000&w=1500&title=${encodeURIComponent(
      meetup.title || "404 - Page not found"
    )}&date=${encodeURIComponent(
      new Date(meetup.from * 1000).toDateString() +
        ", " +
        moment(meetup.from * 1000)
          .tz("UTC")
          .format("HH.mm") +
        " UTC" || ""
    )}`
  );

  return new Response(resp.body, {
    headers: resp.headers,
  });
}
