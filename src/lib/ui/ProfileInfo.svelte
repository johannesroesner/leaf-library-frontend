<script lang="ts">
  import type { Profile } from "$lib/types/leaf-library-types";

  let { profile }: { profile: Profile } = $props();
</script>

<div class="flex items-center justify-around gap-10">
  <div class="avatar">
    <div class="flex h-100 w-100 items-center justify-center rounded-full bg-secondary shadow-2xl">
      {#if profile.imageUrl}
        <img src={profile.imageUrl} alt={profile.firstName} class="h-full w-full object-cover" />
      {:else}
        <span class="text-4xl font-semibold text-white">
          {profile.firstName?.[0]}{profile.secondName?.[0]}
        </span>
      {/if}
    </div>
  </div>

  <div class="grow">
    <div class="card space-y-6 rounded-2xl bg-base-300 p-8 shadow-2xl">
      <div class="space-y-1">
        <p class="text-sm font-semibold text-base-content/70">First Name</p>
        <div class="p-4">
          <span class="text-base font-medium">{profile.firstName}</span>
        </div>
      </div>
      <div class="space-y-1">
        <p class="text-sm font-semibold text-base-content/70">Second Name</p>
        <div class="p-4">
          <span class="text-base font-medium">{profile.secondName}</span>
        </div>
      </div>
      <div class="space-y-1">
        <p class="text-sm font-semibold text-base-content/70">Email</p>
        <div class="p-4">
          <span class="text-base font-medium">{profile.email}</span>
        </div>
      </div>
      <div class="space-y-1">
        <p class="text-sm font-semibold text-base-content/70">About Me</p>
        <div class="p-4">
          <span class="text-base font-medium">{profile.aboutMe || "No About me provided."}</span>
        </div>
      </div>
    </div>
  </div>
</div>
