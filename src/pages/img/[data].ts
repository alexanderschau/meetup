import { decode } from "js-base64";
import { getImageUrl } from "../../components/genImageUrls";

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

  return fetch(getImageUrl(meetup));
}
