<script lang="ts">
  import moment from "moment-timezone";
  import { encode } from "js-base64";
  import { copy } from "./copyToClipboard";

  import MeetupSection from "./MeetupSection.svelte";
  import MeetupMate from "./MeetupMate.svelte";

  export let meetup: MeetupType = {
    title: "New Untitled Meetup",
    description: "My little meeting",
    from: Date.now() / 1000,
    // one hour
    to: Date.now() / 1000 + 60 * 60,
  };

  export let mates: MeetupMateType[] = [
    { tz: "Europe/Berlin" },
    { tz: "America/New_York" },
  ];
  let currMate: number = -1;

  let editHead = false;

  let myTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  let inputDateMoment = moment(meetup.from * 1000);
  inputDateMoment.tz(myTimeZone);
  let inputDate = inputDateMoment.format("YYYY-MM-DD");

  let inputEndDate = inputDate;
  let customEndDate = false;
  let inputFromMoment = moment(meetup.from * 1000);
  inputFromMoment.tz(myTimeZone);
  let inputFrom = inputFromMoment.format("HH:mm");

  let inputToMoment = moment(meetup.to * 1000);
  inputToMoment.tz(myTimeZone);
  let inputTo = inputToMoment.format("HH:mm");

  $: {
    meetup.from = moment.tz(inputDate + " " + inputFrom, myTimeZone).unix();
    meetup.to = moment
      .tz(
        (customEndDate ? inputEndDate : inputDate) + " " + inputTo,
        myTimeZone
      )
      .unix();
  }

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  let copyMeetDone = false;
  let copyEditDone = false;
</script>

<div class="my-16">
  {#if editHead}
    <div class="mb-2 font-PlayfairDisplay text-3xl">
      <input bind:value={meetup.title} class="input max-w-md" type="text" />
    </div>
    <input
      type="text"
      bind:value={meetup.description}
      class="input max-w-md text-primary"
    />
    <div class="my-3">
      <label class="block text-primary">URL (optional)</label>
      <input
        bind:value={meetup.url}
        class="input max-w-md"
        placeholder="e.g. https://example.com"
        type="url"
      />
    </div>
    <div class="mt-4">
      <a
        on:click={(e) => {
          e.preventDefault();
          editHead = false;
        }}
        class="link mr-3"
        href="/">Done</a
      >
    </div>
  {:else}
    <div class="mb-2 font-PlayfairDisplay text-3xl">
      {meetup.title}
    </div>
    <div class="max-w-md text-primary">{meetup.description}</div>
    {#if meetup.url}
      <div class="my-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          class="mr-2 inline-block h-4"
          viewBox="0 0 16 16"
        >
          <path
            d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"
          />
          <path
            d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"
          />
        </svg>
        <a target="_blank" rel="noreferrer" href={meetup.url} class="link"
          >{meetup.url.length > 50
            ? meetup.url.slice(0, 30) + "..."
            : meetup.url}</a
        >
      </div>
    {/if}
    <div class="mt-4">
      <a
        on:click={(e) => {
          e.preventDefault();
          editHead = true;
        }}
        class="link"
        href="/">Edit</a
      >
    </div>
  {/if}
  <hr class="my-8 max-w-md" />
</div>
<MeetupSection title="When do you want to meet?">
  <div class="max-w-md">
    <div class="mx-5">
      <label class="block text-primary">Select a date</label>
      <input bind:value={inputDate} class="input" type="date" />
    </div>
    {#if customEndDate}
      <div class="mx-5">
        <label class="block text-primary">Select a end date</label>
        <input bind:value={inputEndDate} class="input" type="date" />
      </div>
    {/if}
    <div class="mx-5 mt-2 mb-3">
      <input id="custom-end" type="checkbox" bind:checked={customEndDate} />
      <label for="custom-end" class="text-primary">Use a custom End Date</label>
    </div>
    <div class="flex">
      <div class="mx-5 flex-1">
        <label class="block text-primary">from</label>
        <input bind:value={inputFrom} class="input" type="time" />
      </div>
      <div class="mx-5 flex-1">
        <label class="block text-primary">to</label>
        <input bind:value={inputTo} class="input" type="time" />
      </div>
    </div>
  </div>
</MeetupSection>
<MeetupSection title="Check timezones">
  {#each mates as mate, i}
    <MeetupMate
      on:openEdit={() => (currMate = i)}
      on:closeEdit={() => (currMate = -1)}
      on:remove={() => {
        mates = mates.filter((m, id) => id !== i);
        currMate = -1;
      }}
      bind:mate
      {meetup}
      edit={currMate == i}
    />
  {/each}
  <a
    on:click={(e) => {
      e.preventDefault();
      mates = [...mates, { tz: "UTC" }];
    }}
    href="/"
    class="link mt-10 block">+ Add a mate</a
  >
</MeetupSection>

<div class="my-12">
  <a
    target="_blank"
    class="button"
    href={`/view/${encode(JSON.stringify(meetup))}`}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="mr-3 inline-block h-4"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path
        d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
      />
      <path
        d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
      />
    </svg>
    Preview Meetup
  </a>
  <a
    on:click={async (e) => {
      e.preventDefault();
      copy(`https://meetup.day/view/${encode(JSON.stringify(meetup))}`);
      copyMeetDone = true;
      await sleep(1000);
      copyMeetDone = false;
    }}
    target="_blank"
    class="button"
    href="/"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="mr-3 inline-block h-4"
      viewBox="0 0 16 16"
    >
      <path
        d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"
      />
    </svg>
    {#if copyMeetDone}
      Link copied to clipboard
    {:else}
      Share link to Meetup
    {/if}
  </a>
  <a
    on:click={async (e) => {
      e.preventDefault();
      copy(`https://meetup.day/new?d=${encode(JSON.stringify(meetup))}`);
      copyEditDone = true;
      await sleep(1000);
      copyEditDone = false;
    }}
    class="button"
    href="/"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="mr-3 inline-block h-4"
      viewBox="0 0 16 16"
    >
      <path
        d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
      />
    </svg>
    {#if copyEditDone}
      Link copied to clipboard
    {:else}
      Copy edit link
    {/if}
  </a>
</div>
