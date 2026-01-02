<script lang="ts">
  import { util } from "$lib/services/leaf-library-utils";
  import { goto } from "$app/navigation";
  import { currentPage } from "$lib/runes.svelte";

  currentPage.title = "Logout";

  util.clearSession();
  goto("/");
</script>
