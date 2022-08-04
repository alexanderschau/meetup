import { decode } from "js-base64";
import moment from "moment-timezone";
/*import ics, { type DateArray } from "ics";*/

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

  /*const resp = (await new Promise((resolve, reject) => {
    ics.createEvent(
      {
        title: meetup.title,
        description:
          meetup.description + (meetup.url ? "\n\n" + meetup.url : ""),
        start: moment(meetup.from * 1000)
          .tz("UTC")
          .format("YYYY-M-D-H-m")
          .split("-")
          .map((i) => parseInt(i)) as DateArray,
        end: moment(meetup.to * 1000)
          .tz("UTC")
          .format("YYYY-M-D-H-m")
          .split("-")
          .map((i) => parseInt(i)) as DateArray,
        startOutputType: "utc",
        startInputType: "utc",
        endInputType: "utc",
        endOutputType: "utc",
        url: meetup.url,
        productId: "Meetup.day/Meetup Planner",
      },
      (e, v) => {
        if (!e) {
          resolve(v);
        }
        reject(e);
      }
    );
  })) as string;*/
  const resp = "";

  return new Response(resp, {
    headers: {
      "content-type": "text/calendar",
    },
  });
}
