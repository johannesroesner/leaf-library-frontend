<script lang="ts">
  import { leafLibraryService } from "$lib/services/leaf-library-service.js";
  import PlantDetails from "$lib/ui/PlantDetails.svelte";
  import { type Plant } from "$lib/types/leaf-library-types.js";
  import Toast from "$lib/ui/Toast.svelte";
  import { util } from "$lib/services/leaf-library-utils";
  import { currentUser } from "$lib/runes.svelte";
  import ImageDeleteBar from "$lib/ui/ImageDeleteBar.svelte";

  let { plant = $bindable() }: { plant: Plant } = $props();

  let commonName = $derived(plant.commonName);
  let scientificName = $derived(plant.scientificName);
  let note = $derived(plant.note ?? "");
  let latitude = $derived(plant.latitude);
  let longitude = $derived(plant.longitude);
  let type = $derived(plant.type);
  let biome = $derived(plant.biome);
  let preparedImageUrls = $derived(plant.imageUrls ? [...plant.imageUrls] : null);

  let images: File[] = $state([]);

  let errorMessage = $state("");
  let successMessage = $state("");

  const removeImage = async (url: string) => {
    await leafLibraryService.deleteImage(util.getPublicIdFromImageUrl(url));
    plant.imageUrls = plant.imageUrls!.filter((u) => u !== url);
    await leafLibraryService.updatePlant(plant);
  };

  const onSubmit = async () => {
    for (const image of images) {
      const url = await leafLibraryService.uploadImage(image);
      if (!preparedImageUrls) preparedImageUrls = [];
      preparedImageUrls!.push(url);
    }

    const response = await leafLibraryService.updatePlant({
      _id: plant._id,
      commonName,
      scientificName,
      note: note === "" ? null : note,
      latitude,
      longitude,
      type,
      biome,
      imageUrls: preparedImageUrls,
      date: plant.date,
      userId: currentUser.id
    });
    if (response.error) errorMessage = "Server error.";
    else successMessage = "Plant successfully updated!";
  };

  const submitButtonText = "Update Plant";
  const title = "Update Plant Details";
</script>

<ImageDeleteBar imageUrls={preparedImageUrls} {removeImage} />

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
