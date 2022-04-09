import moment from "moment-timezone";

const e = encodeURIComponent;
export let googleCalendar = (meetup: MeetupType): string => {
  const from = moment(meetup.from * 1000)
    .tz("Europe/London")
    .format("YYYYMMDD\\THHmm00\\Z");
  const to = moment(meetup.to * 1000)
    .tz("Europe/London")
    .format("YYYYMMDD\\THHmm00\\Z");
  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${e(
    meetup.title
  )}&dates=${e(from + "/" + to)}&details=${e(
    meetup.description + (meetup.url ? "\n\n" + meetup.url : "")
  )}`;
};
