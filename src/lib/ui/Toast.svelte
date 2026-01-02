<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  interface Props {
    text: string;
    type: "error" | "success";
  }
  let { text, type }: Props = $props();

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
    <div class="alert {type === 'error' ? 'alert-error' : 'alert-success'}">
      <span>{text}</span>
    </div>
  </div>
{/if}
