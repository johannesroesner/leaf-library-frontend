<script lang="ts">
  import HeroBackground from "$lib/ui/HeroBackground.svelte";
  import UserCredentials from "$lib/ui/UserCredentials.svelte";
  import Toast from "$lib/ui/Toast.svelte";

  let { form } = $props();
</script>

<HeroBackground>
  <form method="POST" action="?/login">
    <UserCredentials />

    {#if form?.message}
      <Toast text={form?.message} type="error" />
    {/if}
  </form>
</HeroBackground>
