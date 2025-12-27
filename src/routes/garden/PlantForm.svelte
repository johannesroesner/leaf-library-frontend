<script>
  import { leafLibraryService } from "$lib/services/leaf-library-service.js";
  import ErrorAlert from "$lib/ui/ErrorAlert.svelte";
  import PlantDetails from "$lib/ui/PlantDetails.svelte";
  import { BiomeArray, PlantTypeArray } from "$lib/types/leaf-library-types.js";

  let commonName = "";
  let scientificName = "";
  let note = "";
  let latitude = 0;
  let longitude = 0;
  let type = PlantTypeArray[0];
  let biome = BiomeArray[0];

  let imageUrls = [""];
  const preparedImageUrls =
    imageUrls.length === 0 || (imageUrls.length === 1 && imageUrls[0] === "") ? null : imageUrls;

  let errorMessage = "";
  const onSubmit = async () => {
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
  };
</script>

<PlantDetails
  bind:commonName
  bind:scientificName
  bind:note
  bind:latitude
  bind:longitude
  bind:type
  bind:biome
  {onSubmit}
/>
{#if errorMessage}
  <ErrorAlert text={errorMessage} />
{/if}
