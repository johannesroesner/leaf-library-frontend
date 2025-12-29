<script lang="ts">
  import { leafLibraryService } from "$lib/services/leaf-library-service.js";
  import PlantDetails from "$lib/ui/PlantDetails.svelte";
  import { BiomeArray, PlantTypeArray } from "$lib/types/leaf-library-types.js";
  import Toast from "$lib/ui/Toast.svelte";

  let { mapEvent = null } = $props();

  let commonName = $state("");
  let scientificName = $state("");
  let note = $state("");
  let latitude = $state(0);
  let longitude = $state(0);
  let type = $state(PlantTypeArray[0]);
  let biome = $state(BiomeArray[0]);

  let images: File[] = $state([]);
  let preparedImageUrls: string[] | null = [];

  function resetForm() {
    commonName = "";
    scientificName = "";
    note = "";
    latitude = 0;
    longitude = 0;
    type = PlantTypeArray[0];
    biome = BiomeArray[0];
    images = [];
    preparedImageUrls = [];
  }

  let errorMessage = $state("");
  let successMessage = $state("");

  const onSubmit = async () => {
    if (images.length > 0) {
      for (const image of images) {
        const url = await leafLibraryService.uploadImage(image);
        preparedImageUrls!.push(url);
      }
    } else preparedImageUrls = null;

    const newPlant = {
      commonName,
      scientificName,
      note: note === "" ? null : note,
      latitude,
      longitude,
      type,
      biome,
      imageUrls: preparedImageUrls
    };

    const response = await leafLibraryService.createPlantForUser(newPlant);
    if (response.error) errorMessage = "Server error.";
    else {
      mapEvent(newPlant);
      resetForm();
      successMessage = "Plant successfully created!";
    }
  };

  const submitButtonText = "Create Plant";
  const title = "Create a new Plant";
</script>

<PlantDetails
  bind:commonName
  bind:scientificName
  bind:note
  bind:latitude
  bind:longitude
  bind:type
  bind:biome
  bind:images
  {onSubmit}
  {submitButtonText}
  {title}
/>
{#if successMessage}
  <Toast text={successMessage} type="success" />
{/if}
{#if errorMessage}
  <Toast text={errorMessage} type="error" />
{/if}
