<script lang="ts">
  import Toast from "$lib/ui/Toast.svelte";
  import CollectionDetails from "$lib/ui/CollectionDetails.svelte";
  import type { Collection } from "$lib/types/leaf-library-types";
  import ImageDeleteBar from "$lib/ui/ImageDeleteBar.svelte";
  import { enhance } from "$app/forms";
  import type { SubmitFunction } from "@sveltejs/kit";

  type Props = {
    collection: Collection;
    updateEvent?: (collection: Collection) => void;
  };
  let { collection = $bindable(), updateEvent }: Props = $props();

  let name = $derived(collection.name);
  let description = $derived(collection.description);
  let preparedImageUrls = $derived(collection.imageUrl ? [collection.imageUrl] : null);

  let image: File[] = $state([]);

  let errorMessage = $state("");
  let successMessage = $state("");

  const handleUpdate: SubmitFunction = () => {
    return async ({ result, update }) => {
      if (result.type === "success") {
        if (result.data) {
          if (updateEvent) updateEvent(result.data.data as Collection);
          successMessage = result.data.successMessage as string;
        }
        await update();
      } else if (result.type === "failure") {
        if (result.data) {
          errorMessage = result.data.errorMessage as string;
        }
        await update();
      } else {
        errorMessage = "Server error.";
        await update();
      }
    };
  };

  const submitButtonText = "Update Collection";
  const title = "Update Collection Details";
</script>

<ImageDeleteBar imageUrls={preparedImageUrls} handle={handleUpdate} />

<form
  method="POST"
  action="?/updateCollection"
  enctype="multipart/form-data"
  use:enhance={handleUpdate}
  class="w-full"
>
  <CollectionDetails bind:name bind:description bind:image {submitButtonText} {title} />
</form>

{#if successMessage}
  <Toast text={successMessage} type="success" />
{/if}
{#if errorMessage}
  <Toast text={errorMessage} type="error" />
{/if}
