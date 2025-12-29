<script lang="ts">
  import ImageUploader from "$lib/ui/ImageUploader.svelte";

  let {
    name = $bindable(""),
    description = $bindable(""),
    image = $bindable([]),
    onSubmit,
    submitButtonText,
    title
  } = $props();

  const allFieldsFilled = $derived(name.trim() !== "" && description.trim() !== "");
</script>

<fieldset
  class="mt-5 fieldset w-full rounded-box border border-base-300 bg-base-200 p-4 shadow-2xl"
>
  <legend class="fieldset-legend">{title}</legend>
  <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
    <div class="flex flex-col gap-4">
      <div>
        <label class="label" for="name">Name</label>
        <input
          id="name"
          bind:value={name}
          type="text"
          class="input w-full"
          placeholder="Collection Name"
          required
        />
      </div>
      <div>
        <label class="label" for="description">Description</label>
        <input
          id="description"
          bind:value={description}
          type="text"
          class="input w-full"
          placeholder="Collection Description"
          required
        />
      </div>
    </div>
    <div class="flex w-full">
      <ImageUploader bind:images={image} multiple={false} />
    </div>
  </div>
  <button class="btn mt-6 w-full btn-neutral" onclick={onSubmit} disabled={!allFieldsFilled}>
    {submitButtonText}
  </button>
</fieldset>
