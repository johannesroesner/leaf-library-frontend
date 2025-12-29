<script lang="ts">
  import ProfileInfo from "$lib/ui/ProfileInfo.svelte";
  import type { Profile, Role } from "$lib/types/leaf-library-types.js";
  import { currentUser } from "$lib/runes.svelte";
  import Toolbar from "$lib/ui/Toolbar.svelte";
  import ProfileForm from "./ProfileForm.svelte";

  let profile: Profile = $derived({
    _id: currentUser.id,
    firstName: currentUser.name.split(" ")[0] || "",
    secondName: currentUser.name.split(" ")[1] || "",
    imageUrl: currentUser.imageUrl,
    aboutMe: currentUser.aboutMe,
    email: currentUser.email,
    role: currentUser.role as Role
  });

  let updateStatus = $state(false);
</script>

<Toolbar bind:updateStatus />
<ProfileInfo {profile} />
{#if updateStatus}
  <ProfileForm {profile} />
{/if}
