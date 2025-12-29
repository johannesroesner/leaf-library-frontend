<script lang="ts">
  import { leafLibraryService } from "$lib/services/leaf-library-service.js";
  import Toast from "$lib/ui/Toast.svelte";
  import CollectionDetails from "$lib/ui/CollectionDetails.svelte";
  import type { Collection } from "$lib/types/leaf-library-types";
  import { util } from "$lib/services/leaf-library-utils";
  import ImageDeleteBar from "$lib/ui/ImageDeleteBar.svelte";

  let { collection = $bindable() }: { collection: Collection } = $props();

  let name = $derived(collection.name);
  let description = $derived(collection.description);
  let imageUrl = $derived(collection.imageUrl ? collection.imageUrl : null);

  let image: File[] = $state([]);

  let errorMessage = $state("");
  let successMessage = $state("");

  const onSubmit = async () => {
    if (image.length > 0) {
      if (imageUrl) await leafLibraryService.deleteImage(util.getPublicIdFromImageUrl(imageUrl!));
      imageUrl = await leafLibraryService.uploadImage(image[0]);
    }
    const response = await leafLibraryService.updateCollection({
      _id: collection._id,
      name,
      description,
      imageUrl,
      userId: collection.userId,
      plantIds: collection.plantIds
    });
    if (response.error) errorMessage = "Server error.";
    else {
      collection = {
        ...collection,
        name,
        description,
        imageUrl
      };
      successMessage = "Collection successfully updated!";
    }
  };

  const removeImage = async (url: string) => {
    await leafLibraryService.deleteImage(util.getPublicIdFromImageUrl(url));
    collection.imageUrl = null;
    await leafLibraryService.updateCollection(collection);
  };

  const submitButtonText = "Update Collection";
  const title = "Update Collection Details";
</script>

<ImageDeleteBar imageUrls={imageUrl ? [imageUrl] : null} {removeImage} />

<CollectionDetails bind:name bind:description bind:image {onSubmit} {submitButtonText} {title} />
{#if successMessage}
  <Toast text={successMessage} type="success" />
{/if}
{#if errorMessage}
  <Toast text={errorMessage} type="error" />
{/if}
