<script lang="ts">
  interface Props {
    images?: File[];
    multiple?: boolean;
  }
  let { images = $bindable([]), multiple = true }: Props = $props();

  let imagePreviews = $state<string[]>([]);

  function handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const files = Array.from(input.files);
      if (multiple) {
        images = [...images, ...files];
        const newPreviews = files.map((file) => URL.createObjectURL(file));
        imagePreviews = [...imagePreviews, ...newPreviews];
      } else {
        imagePreviews.forEach(URL.revokeObjectURL);
        images = [files[0]];
        imagePreviews = [URL.createObjectURL(files[0])];
      }
    }
  }

  function removeImage(index: number) {
    URL.revokeObjectURL(imagePreviews[index]);
    images = images.filter((_, i) => i !== index);
    imagePreviews = imagePreviews.filter((_, i) => i !== index);
  }
</script>

<div class="form-control w-full">
  <label class="label" for="image-upload"> Image upload </label>

  <input
    name="images"
    id="image-upload"
    type="file"
    accept="image/*"
    {multiple}
    class="file-input-bordered file-input mt-2 w-full"
    onchange={handleFileChange}
  />

  {#if imagePreviews.length > 0}
    <div class="mt-4 flex flex-wrap gap-2">
      {#each imagePreviews as src, index (index)}
        <div class="group relative">
          <img
            {src}
            alt="Preview"
            class="h-20 w-20 rounded-lg border border-base-300 object-cover"
          />
          <button
            type="submit"
            class="btn absolute -top-2 -right-2 btn-circle transition-opacity btn-xs btn-error"
            onclick={() => removeImage(index)}>✕</button
          >
        </div>
      {/each}
    </div>
  {/if}
</div>
