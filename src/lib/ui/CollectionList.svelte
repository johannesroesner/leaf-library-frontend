<script>
import CollectionCard from "$lib/ui/CollectionCard.svelte";

let { collections } = $props();
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
