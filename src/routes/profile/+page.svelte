<script lang="ts">
  import ProfileInfo from "$lib/ui/ProfileInfo.svelte";
  import type { Profile, Role } from "$lib/types/leaf-library-types.js";
  import { currentPage, currentUser } from "$lib/runes.svelte";
  import Toolbar from "$lib/ui/Toolbar.svelte";
  import ProfileForm from "./ProfileForm.svelte";
  import { util } from "$lib/services/leaf-library-utils";
  import type { Session } from "$lib/types/frontend-specific-types";

  currentPage.title = "Profile";

  let profile: Profile = $derived({
    _id: currentUser.id,
    firstName: currentUser.name.split(" ")[0] || "",
    secondName: currentUser.name.split(" ")[1] || "",
    imageUrl: currentUser.imageUrl,
    aboutMe: currentUser.aboutMe,
    email: currentUser.email,
    role: currentUser.role as Role
  });

  function profileUpdate(session: Session) {
    util.updateUserRunes(session);
    updateStatus = false;
  }

  let updateStatus = $state(false);
</script>

<Toolbar bind:updateStatus />
<ProfileInfo {profile} />
{#if updateStatus}
  <ProfileForm {profile} updateEvent={profileUpdate} />
{/if}
