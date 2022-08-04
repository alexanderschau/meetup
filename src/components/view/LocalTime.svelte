<script lang="ts">
  import moment from "moment-timezone";

  export let timestamp: number;
  let localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  let localTimeMoment = moment(timestamp * 1000);
  localTimeMoment.tz(localTimeZone);
  let localTime = localTimeMoment.format("HH:mm").split(":");
</script>

{localTime[0]}.<span class="text-sm">{localTime[1]}</span>
