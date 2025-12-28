<script lang="ts">
	import { leafLibraryService } from "$lib/services/leaf-library-service.js";
	import PlantDetails from "$lib/ui/PlantDetails.svelte";
	import { type Plant } from '$lib/types/leaf-library-types.js';
	import Toast from "$lib/ui/Toast.svelte";
	import { util } from '$lib/services/leaf-library-utils';
  import { currentUser } from "$lib/runes.svelte";

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
		await leafLibraryService.deleteImage(util.getPublicIdFromImageUrl(url))
		plant.imageUrls = plant.imageUrls!.filter(u => u !== url)
		await leafLibraryService.updatePlant(plant)
	}

	const onSubmit = async () => {
		for (const image of images) {
			const url = await leafLibraryService.uploadImage(image);
			if(!preparedImageUrls) preparedImageUrls = []
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
			userId: currentUser.id,
		});
		console.log(response);
		if (response.error) errorMessage = "Server error.";
		else successMessage = "Plant successfully updated!"
	};

	const submitButtonText = "Update Plant";
</script>

{#if preparedImageUrls && preparedImageUrls.length > 0}
	<div class="card bg-base-200 shadow-2xl p-4 mt-5">
		<h3 class="text-sm font-bold mb-3 opacity-70">Saved Images</h3>
		<div class="flex flex-wrap gap-4">
			{#each preparedImageUrls as url (url)}
				<div class="indicator">
					<button
						type="button"
						class="indicator-item badge badge-error badge-sm cursor-pointer hover:scale-110 transition-transform"
						onclick={() => removeImage(url)}
					>
						✕
					</button>
					<div class="avatar">
						<div class="w-20 h-20 rounded-lg">
							<img src={url} alt="Preview." />
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
{/if}

<PlantDetails
	bind:commonName
	bind:scientificName
	bind:note
	bind:latitude
	bind:longitude
	bind:type
	bind:biome
	bind:images
	onSubmit={onSubmit}
	submitButtonText={submitButtonText}
/>

{#if successMessage}
	<Toast text={successMessage} type="success" />
{/if}
{#if errorMessage}
	<Toast text={errorMessage} type="error" />
{/if}
