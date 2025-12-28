<script lang="ts">
  import { BiomeArray, PlantTypeArray } from "$lib/types/leaf-library-types";
  import ImageUploader from "./ImageUploader.svelte";
  import MapPicker from "$lib/ui/MapPicker.svelte";

  let {
    commonName = $bindable(""),
    scientificName = $bindable(""),
    note = $bindable(""),
    latitude = $bindable(0),
    longitude = $bindable(0),
    type = $bindable(PlantTypeArray[0]),
    biome = $bindable(BiomeArray[0]),
    images = $bindable([]),
    onSubmit,
		submitButtonText
  } = $props();

  const allFieldsFilled = $derived(
    commonName.trim() !== "" &&
      scientificName.trim() !== "" &&
      latitude.toString() !== "" &&
      longitude.toString() !== ""
  );

  const isFormValid = $derived(allFieldsFilled);
</script>

<fieldset class="fieldset w-full rounded-box border border-base-300 bg-base-200 p-6 shadow-2xl">
  <legend class="fieldset-legend">Create new plant</legend>

  <div class="flex flex-col gap-8 md:flex-row">
    <div class="flex flex-1 flex-col gap-2">
      <label class="label" for="common-name">Common Name</label>
      <input
        id="common-name"
        bind:value={commonName}
        type="text"
        class="input w-full"
        placeholder="Monstera"
        required
      />

      <label class="label" for="scientific-name">Scientific Name</label>
      <input
        id="scientific-name"
        bind:value={scientificName}
        type="text"
        class="input w-full"
        placeholder="Monstera deliciosa"
        required
      />

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="label" for="plant-type">Plant Type</label>
          <select id="plant-type" bind:value={type} class="select w-full">
            {#each PlantTypeArray as type (type)}
              <option value={type}>{type}</option>
            {/each}
          </select>
        </div>
        <div>
          <label class="label" for="biome">Biome</label>
          <select id="biome" bind:value={biome} class="select w-full">
            {#each BiomeArray as biome (biome)}
              <option value={biome}>{biome}</option>
            {/each}
          </select>
        </div>

        <div class="col-span-2 flex flex-col gap-2">
          <label class="label" for="note">Note</label>
          <textarea
            id="note"
            bind:value={note}
            class="textarea h-24 w-full"
            placeholder="Monstera deliciosa is native to tropical forests..."
          ></textarea>
        </div>
      </div>
    </div>

    <div class="flex w-full flex-col gap-4 md:w-96">
      <ImageUploader bind:images multiple />
      <MapPicker bind:latitude bind:longitude />
    </div>
  </div>

  <div class="mt-6 flex justify-end">
    <button class="btn px-8 btn-neutral" onclick={onSubmit} disabled={!isFormValid}>
			{submitButtonText}
    </button>
  </div>
</fieldset>
