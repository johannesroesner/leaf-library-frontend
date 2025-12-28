<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  let { text, type } = $props();
  let visible = $state(true);

  onMount(() => {
    const timer = setTimeout(() => {
      visible = false;
    }, 3000);
    return () => clearTimeout(timer);
  });
</script>

{#if visible}
  <div transition:fade={{ duration: 200 }} class="toast toast-end">
    <div class="alert {type === 'error' ? 'alert-danger' : 'alert-success'}">
      <span>{text}</span>
    </div>
  </div>
{/if}
