<script lang="ts">
  import { leafLibraryService } from "$lib/services/leaf-library-service.js";
  import PlantDetails from "$lib/ui/PlantDetails.svelte";
  import { BiomeArray, PlantTypeArray } from "$lib/types/leaf-library-types.js";
  import Toast from "$lib/ui/Toast.svelte";

  let commonName = "";
  let scientificName = "";
  let note = "";
  let latitude = 0;
  let longitude = 0;
  let type = PlantTypeArray[0];
  let biome = BiomeArray[0];

  let images: File[] = [];
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

  let errorMessage = "";
  let successMessage = "";

  const onSubmit = async () => {
    if (images.length > 0) {
      for (const image of images) {
        const url = await leafLibraryService.uploadImage(image);
        preparedImageUrls!.push(url);
      }
    } else preparedImageUrls = null;

    const response = await leafLibraryService.createPlantForUser({
      commonName,
      scientificName,
      note: note === "" ? null : note,
      latitude,
      longitude,
      type,
      biome,
      imageUrls: preparedImageUrls
    });
    if (response.error) errorMessage = "Server error.";
    else {
      resetForm();
      successMessage = "Plant successfully created!";
    }
  };

  const submitButtonText = "Create Plant";
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
/>
{#if successMessage}
  <Toast text={successMessage} type="success" />
{/if}
{#if errorMessage}
  <Toast text={errorMessage} type="error" />
{/if}
