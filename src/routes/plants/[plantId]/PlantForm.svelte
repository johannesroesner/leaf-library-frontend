<script lang="ts">
  import PlantDetails from "$lib/ui/PlantDetails.svelte";
  import { type Plant } from "$lib/types/leaf-library-types.js";
  import Toast from "$lib/ui/Toast.svelte";
  import ImageDeleteBar from "$lib/ui/ImageDeleteBar.svelte";
  import { enhance } from "$app/forms";
  import type { SubmitFunction } from "@sveltejs/kit";

  type Props = {
    plant: Plant;
    updateEvent?: (plant: Plant) => void;
  };
  let { plant = $bindable(), updateEvent }: Props = $props();

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

  const handleUpdate: SubmitFunction = () => {
    return async ({ result, update }) => {
      if (result.type === "success") {
        if (result.data) {
          if (updateEvent) updateEvent(result.data.data as Plant);
          successMessage = result.data.successMessage as string;
        }
        await update();
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

  const submitButtonText = "Update Plant";
  const title = "Update Plant Details";
</script>

<ImageDeleteBar imageUrls={preparedImageUrls} handle={handleUpdate} />

<form
  method="POST"
  action="?/updatePlant"
  enctype="multipart/form-data"
  use:enhance={handleUpdate}
  class="w-full"
>
  <PlantDetails
    bind:commonName
    bind:scientificName
    bind:note
    bind:latitude
    bind:longitude
    bind:type
    bind:biome
    bind:images
    {submitButtonText}
    {title}
  />
</form>

{#if successMessage}
  <Toast text={successMessage} type="success" />
{/if}
{#if errorMessage}
  <Toast text={errorMessage} type="error" />
{/if}
