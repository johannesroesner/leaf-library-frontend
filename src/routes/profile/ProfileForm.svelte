<script lang="ts">
  import { leafLibraryService } from "$lib/services/leaf-library-service.js";
  import Toast from "$lib/ui/Toast.svelte";
  import { util } from "$lib/services/leaf-library-utils";
  import ImageDeleteBar from "$lib/ui/ImageDeleteBar.svelte";
  import type { Profile } from "$lib/types/leaf-library-types";
  import ProfileDetails from "$lib/ui/ProfileDetails.svelte";

  let { profile = $bindable() }: { profile: Profile } = $props();

  let firstName = $derived(profile.firstName);
  let secondName = $derived(profile.secondName);
  let email = $derived(profile.email);
  let aboutMe = $derived(profile.aboutMe ? profile.aboutMe : "");
  let imageUrl = $derived(profile.imageUrl ? profile.imageUrl : null);

  let image: File[] = $state([]);

  let errorMessage = $state("");
  let successMessage = $state("");

  const onSubmit = async () => {
    if (image.length > 0) {
      if (imageUrl) await leafLibraryService.deleteImage(util.getPublicIdFromImageUrl(imageUrl!));
      imageUrl = await leafLibraryService.uploadImage(image[0]);
    }
    const response = await leafLibraryService.updateProfile({
      _id: profile._id,
      firstName,
      secondName,
      email,
      aboutMe,
      imageUrl,
      role: profile.role
    });
    if (response.error) {
      errorMessage = response.code === 409 ? "E-mail already in use." : "Server error.";
    } else {
      profile = {
        ...profile,
        firstName,
        secondName,
        email,
        aboutMe,
        imageUrl
      };
      successMessage = "Profile successfully updated!";
    }
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

<ProfileDetails
  bind:firstName
  bind:secondName
  bind:email
  bind:aboutMe
  bind:image
  {onSubmit}
  {submitButtonText}
  {title}
/>
{#if successMessage}
  <Toast text={successMessage} type="success" />
{/if}
{#if errorMessage}
  <Toast text={errorMessage} type="error" />
{/if}
