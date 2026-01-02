<script lang="ts">
  import HeroBackground from "$lib/ui/HeroBackground.svelte";
  import UserCredentials from "$lib/ui/UserCredentials.svelte";
  import Toast from "$lib/ui/Toast.svelte";

  interface Props {
    form?: { message?: string } | null;
  }
  let { form }: Props = $props();
</script>

<HeroBackground>
  <form method="POST" action="?/login">
    <UserCredentials />

    {#if form?.message}
      <Toast text={form.message} type="error" />
    {/if}
  </form>
</HeroBackground>
