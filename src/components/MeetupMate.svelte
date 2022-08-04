<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import moment from "moment-timezone";
  import TimezoneSelect from "./TimezoneSelect.svelte";

  const dispatch = createEventDispatcher();
  const openEdit = () => {
    edit = true;
    dispatch("openEdit");
  };
  const closeEdit = () => {
    edit = false;
    dispatch("closeEdit");
  };
  const removeMate = () => {
    edit = false;
    dispatch("remove");
  };

  export let meetup: MeetupType;
  export let mate: MeetupMateType;
  export let edit: boolean = false;

  let fromTime = ["", ""];
  $: fromTime = moment(meetup.from * 1000)
    .tz(mate.tz)
    .format("HH:mm")
    .split(":");
  let toTime = ["", ""];
  $: toTime = moment(meetup.to * 1000)
    .tz(mate.tz)
    .format("HH:mm")
    .split(":");

  let removeConfirm = false;
</script>

<div class="my-6 flex px-3">
  <div class="mr-12 text-lg">
    {fromTime[0]}.<span class="text-sm">{fromTime[1]}</span> - {toTime[0]}.<span
      class="text-sm">{toTime[1]}</span
    >
  </div>
  <a
    on:click={(e) => {
      e.preventDefault();
      edit ? closeEdit() : openEdit();
    }}
    class="flex-1"
    href="/"
  >
    <div>{mate.tz.replace(/_/g, " ")}</div>
    <div class="text-sm text-primary">
      {moment().tz(mate.tz).format("Z (z)")}
    </div>
  </a>
</div>
{#if edit}
  <div class="px-3">
    <label class="block text-primary">Select a timezone</label>
    <TimezoneSelect bind:timezone={mate.tz} />

    <a
      on:click={(e) => {
        e.preventDefault();
        if (!removeConfirm) {
          removeConfirm = true;
        } else {
          removeMate();
          removeConfirm = false;
        }
      }}
      href="/"
      class={`link my-2 block max-w-sm text-right ${
        removeConfirm ? "text-red-600" : ""
      }`}>{removeConfirm ? "Confirm deletion" : "Remove mate"}</a
    >
  </div>
{/if}
