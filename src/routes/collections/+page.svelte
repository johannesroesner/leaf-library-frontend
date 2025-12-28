<script lang="ts">
import CollectionList from "$lib/ui/CollectionList.svelte";
import { currentCollections } from "$lib/runes.svelte";
</script>

<CollectionList collections={currentCollections.collections} />

