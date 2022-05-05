import moment from "moment-timezone";
import jwt from "jsonwebtoken";

export const getImageUrl = (meetup: MeetupType): string => {
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
    process.env.IMAGE_API_KEY || import.meta.env.IMAGE_API_KEY
  );

  return `https://img.alexander.sbs/v1/image?t=${token}`;
};
