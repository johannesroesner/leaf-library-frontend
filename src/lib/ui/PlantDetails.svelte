<script lang="ts">
  import {
    type Biome,
    BiomeArray,
    type PlantType,
    PlantTypeArray
  } from "$lib/types/leaf-library-types";
  import ImageUploader from "./ImageUploader.svelte";
  import MapPicker from "$lib/ui/MapPicker.svelte";

  type Props = {
    submitButtonText: string;
    title: string;
    commonName?: string;
    scientificName?: string;
    note?: string;
    latitude?: number;
    longitude?: number;
    type?: PlantType;
    biome?: Biome;
    images?: File[];
  };

  let {
    submitButtonText,
    title,
    commonName = $bindable(""),
    scientificName = $bindable(""),
    note = $bindable(""),
    latitude = $bindable(0),
    longitude = $bindable(0),
    type = $bindable(PlantTypeArray[0]),
    biome = $bindable(BiomeArray[0]),
    images = $bindable([])
  }: Props = $props();

  const allFieldsFilled = $derived(
    commonName.trim() !== "" &&
      scientificName.trim() !== "" &&
      latitude.toString() !== "" &&
      longitude.toString() !== ""
  );

  const isFormValid = $derived(allFieldsFilled);
</script>

<fieldset class="fieldset w-full rounded-box border border-base-300 bg-base-200 p-6 shadow-2xl">
  <legend class="fieldset-legend">{title}</legend>

  <div class="flex flex-col gap-8 md:flex-row">
    <div class="flex flex-1 flex-col gap-2">
      <label class="label" for="common-name">Common Name</label>
      <input
        name="commonName"
        id="common-name"
        bind:value={commonName}
        type="text"
        class="input w-full"
        placeholder="Monstera"
        required
      />

      <label class="label" for="scientific-name">Scientific Name</label>
      <input
        name="scientificName"
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
          <select name="plantType" id="plant-type" bind:value={type} class="select w-full">
            {#each PlantTypeArray as t (t)}
              <option value={t}>{t}</option>
            {/each}
          </select>
        </div>
        <div>
          <label class="label" for="biome">Biome</label>
          <select name="biome" id="biome" bind:value={biome} class="select w-full">
            {#each BiomeArray as b (b)}
              <option value={b}>{b}</option>
            {/each}
          </select>
        </div>

        <div class="col-span-2 flex flex-col gap-2">
          <label class="label" for="note">Note</label>
          <textarea
            name="note"
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
    <button class="btn px-8 btn-primary" type="submit" disabled={!isFormValid}>
      {submitButtonText}
    </button>
  </div>
</fieldset>
