<script lang="ts">
  import TimezoneSelect from "./TimezoneSelect.svelte";
  import moment from "moment-timezone";

  let fromDate = new Date().toISOString().split("T")[0];
  let fromTimezone = "UTC";
  let fromTime = "00:00";
  let toTimezone = "Europe/Berlin";

  let resTime: [string, string] = ["", ""];
  $: {
    resTime = moment
      .tz(fromDate + " " + fromTime, fromTimezone)
      .tz(toTimezone)
      .format("HH:mm")
      .split(":") as [string, string];
  }
</script>

<div class="max-w-md">
  <div class="my-8 mx-5">
    <label class="block text-primary">Select a date</label>
    <input bind:value={fromDate} class="input" type="date" />
  </div>
  <div class="my-8 flex">
    <div class="mx-5 flex-1">
      <label class="block text-primary">from timezone</label>
      <TimezoneSelect bind:timezone={fromTimezone} />
    </div>
    <div class="mx-5 flex-1">
      <label class="block text-primary">from time</label>
      <input bind:value={fromTime} class="input" type="time" />
    </div>
  </div>
  <div class="my-8 flex">
    <div class="mx-5 flex-1">
      <label class="block text-primary">to timezone</label>
      <TimezoneSelect bind:timezone={toTimezone} />
    </div>
    <div class="mx-5 flex-1">
      <div class="block text-primary">to time</div>
      {resTime[0]}.<span class="text-sm">{resTime[1]}</span>
    </div>
  </div>
</div>
