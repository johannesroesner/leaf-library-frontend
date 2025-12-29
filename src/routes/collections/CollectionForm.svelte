<script lang="ts">
  import { leafLibraryService } from "$lib/services/leaf-library-service.js";
  import Toast from "$lib/ui/Toast.svelte";
  import CollectionDetails from "$lib/ui/CollectionDetails.svelte";

  let name = $state("");
  let description = $state("");
  let image: File[] = $state([]);

  let preparedImageUrl: string | null;

  function resetForm() {
    name = "";
    description = "";
    image = [];
    preparedImageUrl = null;
  }

  let errorMessage = $state("");
  let successMessage = $state("");

  const onSubmit = async () => {
    if (image.length > 0) preparedImageUrl = await leafLibraryService.uploadImage(image[0]);

    const response = await leafLibraryService.createCollectionForUser({
      name,
      description,
      imageUrl: preparedImageUrl
    });
    if (response.error) errorMessage = "Server error.";
    else {
      resetForm();
      successMessage = "Collection successfully created!";
    }
  };

  const submitButtonText = "Create Collection";
  const title = "Create a new Collection";
</script>

<CollectionDetails bind:name bind:description bind:image {onSubmit} {submitButtonText} {title} />
{#if successMessage}
  <Toast text={successMessage} type="success" />
{/if}
{#if errorMessage}
  <Toast text={errorMessage} type="error" />
{/if}
