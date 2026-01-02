<script lang="ts">
  import HeroBackground from "$lib/ui/HeroBackground.svelte";
  import UserDetails from "$lib/ui/UserDetails.svelte";
  import Toast from "$lib/ui/Toast.svelte";

  interface Props {
    form?: { message?: string } | null;
  }
  let { form }: Props = $props();
</script>

<HeroBackground>
  <form method="POST" action="?/signUp">
    <UserDetails />
    {#if form?.message}
      <Toast text={form.message} type="error" />
    {/if}
  </form>
</HeroBackground>
