<script lang="ts">
	let {
		images = $bindable([]),
		multiple = true
	} = $props();

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
	<label class="label" for="image-upload">
    Image upload
	</label>

	<input
		id="image-upload"
		type="file"
		accept="image/*"
		{multiple}
		class="file-input file-input-bordered w-full mt-2"
		onchange={handleFileChange}
	/>

	{#if imagePreviews.length > 0}
		<div class="flex flex-wrap gap-2 mt-4">
			{#each imagePreviews as src, index (index)}
				<div class="relative group">
					<img {src} alt="Preview" class="w-20 h-20 object-cover rounded-lg border border-base-300" />
					<button
						type="button"
						class="btn btn-circle btn-xs btn-error absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
						onclick={() => removeImage(index)}
					>✕</button>
				</div>
			{/each}
		</div>
	{/if}
</div>