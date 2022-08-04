import moment from "moment-timezone";

const e = encodeURIComponent;
export let googleCalendar = (meetup: MeetupType): string => {
  let fromMoment = moment(meetup.from * 1000);
  fromMoment.tz("UTC");
  const from = fromMoment.format("YYYYMMDD\\THHmm00\\Z");

  let toMoment = moment(meetup.to * 1000);
  toMoment.tz("UTC");
  const to = toMoment.format("YYYYMMDD\\THHmm00\\Z");
  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${e(
    meetup.title
  )}&dates=${e(from + "/" + to)}&details=${e(
    meetup.description + (meetup.url ? "\n\n" + meetup.url : "")
  )}`;
};
