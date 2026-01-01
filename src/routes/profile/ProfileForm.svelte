<script lang="ts">
  import { leafLibraryService } from "$lib/services/leaf-library-service.js";
  import Toast from "$lib/ui/Toast.svelte";
  import { util } from "$lib/services/leaf-library-utils";
  import ImageDeleteBar from "$lib/ui/ImageDeleteBar.svelte";
  import type { Profile } from "$lib/types/leaf-library-types";
  import ProfileDetails from "$lib/ui/ProfileDetails.svelte";
  import type { SubmitFunction } from "@sveltejs/kit";
  import { enhance } from "$app/forms";
  import type { Session } from "$lib/types/frontend-specific-types";

  type Props = {
    profile: Profile;
    updateEvent: (newSession: Session) => void;
  };
  let { profile = $bindable(), updateEvent }: Props = $props();

  let firstName = $derived(profile.firstName);
  let secondName = $derived(profile.secondName);
  let email = $derived(profile.email);
  let aboutMe = $derived(profile.aboutMe ? profile.aboutMe : "");
  let imageUrl = $derived(profile.imageUrl ? profile.imageUrl : null);

  let image: File[] = $state([]);

  let errorMessage = $state("");
  let successMessage = $state("");

  const handleUpdate: SubmitFunction = () => {
    return async ({ result, update }) => {
      if (result.type === "success") {
        if (result.data) {
          updateEvent(result.data.data as Session);
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

  const removeImage = async (url: string) => {
    await leafLibraryService.deleteImage(util.getPublicIdFromImageUrl(url));
    profile.imageUrl = null;
    await leafLibraryService.updateProfile(profile);
  };

  const submitButtonText = "Update Profile";
  const title = "Update Profile Details";
</script>

<ImageDeleteBar imageUrls={imageUrl ? [imageUrl] : null} {removeImage} />

<form
  method="POST"
  action="?/updateProfile"
  enctype="multipart/form-data"
  use:enhance={handleUpdate}
  class="w-full"
>
  <ProfileDetails
    bind:firstName
    bind:secondName
    bind:email
    bind:aboutMe
    bind:image
    {submitButtonText}
    {title}
  />
</form>
{#if successMessage}
  <Toast text={successMessage} type="success" />
{/if}
{#if errorMessage}
  <Toast text={errorMessage} type="error" />
{/if}
