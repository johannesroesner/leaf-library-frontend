<script lang="ts">
  import { BiomeArray, PlantTypeArray } from "$lib/types/leaf-library-types";

  let {
    commonName = $bindable(""),
    scientificName = $bindable(""),
    note = $bindable(""),
    latitude = $bindable(0),
    longitude = $bindable(0),
    type = $bindable(PlantTypeArray[0]),
    biome = $bindable(BiomeArray[0]),
    onSubmit
  } = $props();

  const allFieldsFilled = $derived(
    commonName.trim() !== "" &&
      scientificName.trim() !== "" &&
      latitude.toString() !== "" &&
      longitude.toString() !== "" &&
      type !== "" &&
      biome !== ""
  );

  const isFormValid = $derived(allFieldsFilled);
</script>

<fieldset class="fieldset w-xl rounded-box border border-base-300 bg-base-200 p-4">
  <legend class="fieldset-legend">Create new plant</legend>

  <label class="label" for="common-name">Common Name</label>
  <input
    id="common-name"
    bind:value={commonName}
    type="text"
    class="input"
    placeholder="Monstera"
    required
  />

  <label class="label" for="scientific-name">Scientific Name</label>
  <input
    id="scientific-name"
    bind:value={scientificName}
    type="text"
    class="input"
    placeholder="Monstera deliciosa"
    required
  />

  <label class="label" for="plant-type">Plant Type</label>
  <select id="plant-type" bind:value={type} class="select">
    {#each PlantTypeArray as type (type)}
      <option value={type}>{type}</option>
    {/each}
  </select>

  <label class="label" for="biome">Biome</label>
  <select id="biome" bind:value={biome} class="select">
    {#each BiomeArray as biome (biome)}
      <option value={biome}>{biome}</option>
    {/each}
  </select>

  <label class="label" for="note">Note</label>
  <input
    id="note"
    bind:value={note}
    type="text"
    class="input"
    placeholder="Monstera deliciosa is native to tropical forests of southern Mexico, south to Panama."
  />

  <button class="btn mt-4 btn-neutral" onclick={onSubmit} disabled={!isFormValid}>Create</button>
</fieldset>
