import moment from "moment-timezone";

export const getImageUrl = (meetup: MeetupType): string => {
  return `https://img.alexanderschau.com/v1/img?tkn=${
    import.meta.env.IMAGE_API_KEY
  }&w=1500&h=1000&url=${encodeURIComponent(
    "https://meetup.day/og"
  )}&title=${encodeURIComponent(
    meetup.title || "404 - Page not found"
  )}&date=${encodeURIComponent(
    new Date(meetup.from * 1000).toDateString() +
      ", " +
      moment(meetup.from * 1000)
        .tz("UTC")
        .format("HH.mm") +
      " UTC" || ""
  )}`;
};
