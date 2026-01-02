<script lang="ts">
  import type { Collection } from "$lib/types/leaf-library-types";

  interface Props {
    collection: Collection;
  }
  let { collection }: Props = $props();
</script>

<div class="overflow-y-auto p-6">
  <h2 class="mb-4 text-2xl font-bold">{collection.name}</h2>
  {#if collection.imageUrl}
    <img
      src={collection.imageUrl}
      alt={collection.name + " image."}
      class="mb-4 h-48 w-full rounded-md object-cover"
    />
  {/if}
  <p>
    {collection.description || "No description provided."}
  </p>
</div>
