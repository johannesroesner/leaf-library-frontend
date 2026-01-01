<script lang="ts">
  import PlantDetails from "$lib/ui/PlantDetails.svelte";
  import Toast from "$lib/ui/Toast.svelte";
  import { enhance } from "$app/forms";
  import type { SubmitFunction } from "@sveltejs/kit";
  import type { Plant } from "$lib/types/leaf-library-types";

  type Props = {
    createEvent: (plant: Plant) => void;
  };
  let { createEvent }: Props = $props();

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

  let errorMessage = $state("");
  let successMessage = $state("");

  const submitButtonText = "Create Plant";
  const title = "Create a new Plant";
</script>

<form
  method="POST"
  action="?/createPlant"
  enctype="multipart/form-data"
  use:enhance={handleCreationSuccess}
  class="w-full"
>
  <PlantDetails {submitButtonText} {title} />
</form>
{#if successMessage}
  <Toast text={successMessage} type="success" />
{/if}
{#if errorMessage}
  <Toast text={errorMessage} type="error" />
{/if}
