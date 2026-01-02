<script lang="ts">
  import { enhance } from "$app/forms";
  import type { SubmitFunction } from "@sveltejs/kit";

  interface Props {
    imageUrls: string[] | null;
    handle?: SubmitFunction;
  }
  let { imageUrls = [], handle }: Props = $props();
</script>

{#if imageUrls && imageUrls.length > 0}
  <div class="card mt-5 bg-base-200 p-4 shadow-2xl">
    <h3 class="mb-3 text-sm font-bold opacity-70">Saved Images</h3>
    <div class="flex flex-wrap gap-4">
      {#each imageUrls as url (url)}
        <div class="indicator">
          <form method="POST" action="?/deleteImage" use:enhance={handle}>
            <input type="hidden" name="url" value={url} />
            <button
              type="submit"
              class="indicator-item badge cursor-pointer badge-sm transition-transform badge-error hover:scale-110"
            >
              ✕
            </button>
          </form>
          <div class="avatar">
            <div class="h-20 w-20 rounded-lg">
              <img src={url} alt="Preview" loading="lazy" />
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
{/if}
