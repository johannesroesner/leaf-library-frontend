<script lang="ts">
  let { imageUrls, removeImage } = $props();
</script>

{#if imageUrls && imageUrls.length > 0}
  <div class="card mt-5 bg-base-200 p-4 shadow-2xl">
    <h3 class="mb-3 text-sm font-bold opacity-70">Saved Images</h3>
    <div class="flex flex-wrap gap-4">
      {#each imageUrls as url (url)}
        <div class="indicator">
          <button
            type="button"
            class="indicator-item badge cursor-pointer badge-sm transition-transform badge-error hover:scale-110"
            onclick={() => removeImage(url)}
          >
            ✕
          </button>
          <div class="avatar">
            <div class="h-20 w-20 rounded-lg">
              <img src={url} alt="Preview." />
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
{/if}
