<script lang="ts">
  import { util } from "$lib/services/leaf-library-utils";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  onMount(async () => {
    await util.clearSession();
    await goto("/");
  });
</script>
