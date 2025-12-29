<script lang="ts">
  import { currentCollections, currentPlants } from "$lib/runes.svelte";
  import { page } from "$app/state";
  import { onMount } from "svelte";
  import { leafLibraryService } from "$lib/services/leaf-library-service";
  import type { Plant } from "$lib/types/leaf-library-types";
  import PlantList from "$lib/ui/PlantList.svelte";
  import Toast from "$lib/ui/Toast.svelte";
  import CollectionInfo from "$lib/ui/CollectionInfo.svelte";
  import Toolbar from "$lib/ui/Toolbar.svelte";
  import { util } from "$lib/services/leaf-library-utils";
  import { goto } from "$app/navigation";
  import CollectionForm from "./CollectionForm.svelte";

  let collection = $state(
    currentCollections.collections.find((c) => c._id === page.params.collectionId)
  );
  let plantsInCollection: Plant[] = $state([]);
  let addAblePlants = $derived(
    currentPlants.plants.filter((p) => !plantsInCollection.some((cp) => cp._id === p._id))
  );

  onMount(async () => {
    plantsInCollection = await leafLibraryService.getAllPlantsForCollection(collection!);
  });

  let errorMessage = $state("");

  const removePlantFromCollection = async (plantId: string) => {
    const removeResponse = await leafLibraryService.removePlantFromCollection(collection!, plantId);
    if (removeResponse.error) errorMessage = "Server error.";
    else plantsInCollection = await leafLibraryService.getAllPlantsForCollection(collection!);
  };

  const addPlantToCollection = async (plantId: string) => {
    const addResponse = await leafLibraryService.addPlantToCollection(collection!, plantId);
    if (addResponse.error) errorMessage = "Server error.";
    else plantsInCollection = await leafLibraryService.getAllPlantsForCollection(collection!);
  };

  let updateStatus = $state(false);
  const deleteFunction = async () => {
    if (collection!.imageUrl)
      await leafLibraryService.deleteImage(util.getPublicIdFromImageUrl(collection!.imageUrl));
    await leafLibraryService.deleteCollection(collection!);
    await goto("/collections");
  };
</script>

{#if collection}
  <Toolbar bind:updateStatus {deleteFunction} />
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
          plantFunction={removePlantFromCollection}
          plantFunctionKey="-"
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
          plantFunction={addPlantToCollection}
          plantFunctionKey="+"
        />
      </div>
    </div>
  </div>
  {#if updateStatus}
    <CollectionForm bind:collection />
  {/if}
  {#if errorMessage}
    <Toast text={errorMessage} type="error" />
  {/if}
{:else}
  <p class="mt-10 text-center text-3xl">Server error.</p>
{/if}
