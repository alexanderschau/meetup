<script lang="ts">
  export let title: string = "";
</script>

<div class="my-8">
  {#if title != ""}
    <div class="my-4 font-PlayfairDisplay text-xl">{title}</div>
  {/if}
  <slot />
</div>
