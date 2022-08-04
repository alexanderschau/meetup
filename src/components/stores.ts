import { writable } from "svelte/store";

export const matesStore = writable<MeetupMateType[]>(
  typeof window != "undefined"
    ? JSON.parse(window.localStorage.getItem("mates"))
    : [{ tz: "Europe/Berlin" }, { tz: "America/New_York" }]
);

matesStore.subscribe((val) => {
  if (typeof window == "undefined") return;
  window.localStorage.setItem("mates", JSON.stringify(val));
});
