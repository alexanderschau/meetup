import { writable } from "svelte/store";

const defaultData = [{ tz: "Europe/Berlin" }, { tz: "America/New_York" }];

export const matesStore = writable<MeetupMateType[]>(
  typeof window != "undefined"
    ? JSON.parse(window.localStorage.getItem("mates")) || defaultData
    : defaultData
);

matesStore.subscribe((val) => {
  if (typeof window == "undefined") return;
  window.localStorage.setItem("mates", JSON.stringify(val));
});
