<script lang="ts">
  import Fuse from "fuse.js";
  import { clickOutside } from "./clickOutside";
  import { timezones } from "./timezones";
  import { createEventDispatcher } from "svelte";
  import * as moment from "moment-timezone";

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

  const fuse = new Fuse(timezones, {
    includeScore: true,
  });
  const search = (searchTerm: string): string[] => {
    if (searchTerm == "") return [];
    return fuse
      .search(searchTerm)
      .slice(0, 3)
      .map((i) => i.item);
  };
  let suggestions: string[] = [];

  let searchTimeZone = mate.tz;

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
    <input
      on:input={() => {
        suggestions = search(searchTimeZone);
      }}
      bind:value={searchTimeZone}
      class="input max-w-sm"
      type="text"
    />
    {#if suggestions.length > 0}
      <div
        use:clickOutside
        on:click_outside={() => {
          suggestions = [];
        }}
        class="absolute z-50 my-1 border border-text bg-white"
      >
        {#each suggestions as suggestion}
          <div
            on:click={() => {
              mate.tz = suggestion;
              searchTimeZone = suggestion;
              suggestions = [];
            }}
            class="cursor-pointer py-2 px-4 hover:bg-text hover:bg-opacity-10"
          >
            {suggestion.replace(/_/g, " ")}
          </div>
        {/each}
      </div>
    {/if}
    <a
      on:click={(e) => {
        e.preventDefault();
        removeMate();
      }}
      href="/"
      class="link my-2 block max-w-sm text-right">Remove mate</a
    >
  </div>
{/if}
