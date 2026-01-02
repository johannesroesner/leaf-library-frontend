<script lang="ts">
  import CollectionCard from "$lib/ui/CollectionCard.svelte";
  import type { Collection } from "$lib/types/leaf-library-types";

  interface Props {
    collections: Collection[];
  }
  let { collections }: Props = $props();
</script>

{#each collections as collection (collection._id)}
  <CollectionCard
    id={collection._id}
    image={collection.imageUrl}
    name={collection.name}
    description={collection.description}
  />
{:else}
  <p class="text-3xl">No Collections found.</p>
{/each}
