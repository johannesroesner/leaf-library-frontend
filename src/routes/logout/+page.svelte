<script lang="ts">
  import { util } from "$lib/services/leaf-library-utils";
  import { goto } from "$app/navigation";

  util.clearSession();
  await goto("/");
</script>
