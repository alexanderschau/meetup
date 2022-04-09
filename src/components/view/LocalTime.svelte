<script lang="ts">
  import moment from "moment-timezone";

  export let timestamp: number;
  let localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  let localTime = moment(timestamp * 1000)
    .tz(localTimeZone)
    .format("HH:mm")
    .split(":");
</script>

{localTime[0]}.<span class="text-sm">{localTime[1]}</span>
