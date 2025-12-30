<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/state";
  import { goto } from "$app/navigation";
  import { leafLibraryService } from "$lib/services/leaf-library-service";
  import { util } from "$lib/services/leaf-library-utils";

  onMount(async () => {
    const code = page.url.searchParams.get("code");

    if (code) {
      const response = await leafLibraryService.authenticateViaGithub({ code });
      if (!response.error) {
        await util.updateData();
        goto("/garden");
      }
    } else goto("/");
  });
</script>

<div class="flex min-h-screen flex-col items-center justify-center">
  <span class="loading loading-xl loading-spinner"></span>
</div>
