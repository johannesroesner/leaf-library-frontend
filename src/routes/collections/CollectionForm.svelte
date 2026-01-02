<script lang="ts">
  import Toast from "$lib/ui/Toast.svelte";
  import CollectionDetails from "$lib/ui/CollectionDetails.svelte";
  import type { Collection } from "$lib/types/leaf-library-types";
  import type { SubmitFunction } from "@sveltejs/kit";
  import { enhance } from "$app/forms";

  type Props = {
    createEvent: (collection: Collection) => void;
  };
  let { createEvent }: Props = $props();

  let errorMessage = $state("");
  let successMessage = $state("");
  const handleCreationSuccess: SubmitFunction = () => {
    return async ({ result, update }) => {
      if (result.type === "success") {
        if (result.data) {
          if (createEvent) createEvent(result.data.data);
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

  const submitButtonText = "Create Collection";
  const title = "Create a new Collection";
</script>

<form
  method="POST"
  action="?/createCollection"
  enctype="multipart/form-data"
  use:enhance={handleCreationSuccess}
  class="w-full"
>
  <CollectionDetails {submitButtonText} {title} />
</form>
{#if successMessage}
  <Toast text={successMessage} type="success" />
{/if}
{#if errorMessage}
  <Toast text={errorMessage} type="error" />
{/if}
