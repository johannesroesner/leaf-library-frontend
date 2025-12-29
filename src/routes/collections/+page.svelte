<script lang="ts">
  import CollectionList from "$lib/ui/CollectionList.svelte";
  import { currentCollections } from "$lib/runes.svelte";
  import CollectionForm from "./CollectionForm.svelte";
</script>

<CollectionList collections={currentCollections.collections} />
<CollectionForm />
