<script lang="ts">
  import CollectionList from "$lib/ui/CollectionList.svelte";
  import { currentCollections, currentPage } from "$lib/runes.svelte";
  import CollectionForm from "./CollectionForm.svelte";
  import type { Collection } from "$lib/types/leaf-library-types";
  import { util } from "$lib/services/leaf-library-utils";

  currentPage.title = "Collections";

  type Props = {
    data: {
      collections: Collection[];
    };
  };
  let { data }: Props = $props();
  util.updateData([], data.collections);

  function collectionCreated(collection: Collection) {
    data.collections.push(collection);
    util.updateData([], data.collections);
  }
</script>

<CollectionList collections={currentCollections.collections} />
<CollectionForm createEvent={collectionCreated} />
