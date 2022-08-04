<script lang="ts">
  import Fuse from "fuse.js";
  import { clickOutside } from "./clickOutside";
  import { timezones } from "./timezones";

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

  export let timezone = "Europe/Berlin";
  let searchTimeZone = timezone;
</script>

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
          timezone = suggestion;
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
