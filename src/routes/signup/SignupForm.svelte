<script>
  import HeroBackground from "$lib/ui/HeroBackground.svelte";
  import UserDetails from "$lib/ui/UserDetails.svelte";
  import Toast from "$lib/ui/Toast.svelte";

  let { form } = $props();
</script>

<HeroBackground>
  <form method="POST" action="?/signUp">
    <UserDetails />
    {#if form?.message}
      <Toast text={form?.message} type="error" />
    {/if}
  </form>
</HeroBackground>
