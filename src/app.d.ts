type MemberType = { name: string; timezone: string };
type MeetingType = {
  title: string;
  from: number;
  to: number;
  members: MemberType[];
};

type MeetupType = {
  title: string;
  description?: string;
  url?: string;
  from: number;
  to: number;
};
type MeetupMateType = {
  tz: string;
};
