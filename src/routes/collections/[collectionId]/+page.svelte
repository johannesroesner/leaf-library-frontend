<script lang="ts">
  import { currentCollections, currentPlants } from "$lib/runes.svelte";
  import { page } from "$app/state";
  import type { Collection, Plant } from "$lib/types/leaf-library-types";
  import PlantList from "$lib/ui/PlantList.svelte";
  import Toast from "$lib/ui/Toast.svelte";
  import CollectionInfo from "$lib/ui/CollectionInfo.svelte";
  import Toolbar from "$lib/ui/Toolbar.svelte";
  import { util } from "$lib/services/leaf-library-utils";
  import { invalidateAll } from "$app/navigation";
  import CollectionForm from "./CollectionForm.svelte";
  import type { SubmitFunction } from "@sveltejs/kit";

  type Props = {
    data: {
      allPlants: Plant[];
      plantsInCollection: Plant[];
      collections: Collection[];
    };
  };
  let { data }: Props = $props();
  util.updateData(data.allPlants, data.collections);

  let collection = $state(
    currentCollections.collections.find((c) => c._id === page.params.collectionId)
  );
  let plantsInCollection: Plant[] = $state(data.plantsInCollection);
  let addAblePlants = $state(
    currentPlants.plants.filter((p) => !plantsInCollection.some((cp) => cp._id === p._id))
  );

  let errorMessage = $state("");

  const handlePlantAddOrRemove: SubmitFunction = () => {
    return async ({ result, update }) => {
      if (result.type === "success") {
        await invalidateAll();
        window.location.reload();
      } else if (result.type === "failure") {
        if (result.data) {
          errorMessage = result.data.errorMessage as string;
        }
        await update();
      } else {
        errorMessage = "Server error.";
        await update();
      }
    };
  };

  let updateStatus = $state(false);

  function collectionUpdated(updatedCollection: Collection) {
    data.collections.push(updatedCollection);
    util.updateData([], data.collections);
    collection = updatedCollection;
    updateStatus = false;
  }
</script>

{#if collection}
  <Toolbar bind:updateStatus deleteAction="?/deleteCollection" />
  <div class="mx-auto grid h-[1000px] w-full max-w-7xl grid-cols-3 gap-6 p-4">
    <CollectionInfo {collection} />
    <div class="h-full w-full overflow-y-auto">
      <div class="sticky top-0 z-10 p-4">
        <h3 class="text-lg font-semibold">
          In Collection ({plantsInCollection.length})
        </h3>
      </div>
      <div class="p-4">
        <PlantList
          plants={plantsInCollection}
          plantFunctionAction="?/removePlantFromCollection"
          plantFunctionKey="-"
          handle={handlePlantAddOrRemove}
        />
      </div>
    </div>
    <div class="h-full w-full overflow-y-auto">
      <div class="sticky top-0 z-10 p-4">
        <h3 class="text-lg font-semibold">
          Not in Collection ({addAblePlants.length})
        </h3>
      </div>
      <div class="p-4">
        <PlantList
          plants={addAblePlants}
          plantFunctionAction="?/addPlantToCollection"
          plantFunctionKey="+"
          handle={handlePlantAddOrRemove}
        />
      </div>
    </div>
  </div>
  {#if updateStatus}
    <CollectionForm bind:collection updateEvent={collectionUpdated} />
  {/if}
  {#if errorMessage}
    <Toast text={errorMessage} type="error" />
  {/if}
{:else}
  <p class="mt-10 text-center text-3xl">Server error.</p>
{/if}
