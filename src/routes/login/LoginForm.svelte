<script>
  import HeroBackground from "$lib/ui/HeroBackground.svelte";
  import UserCredentials from "$lib/ui/UserCredentials.svelte";
  import { leafLibraryService } from "$lib/services/leaf-library-service.js";
  import ErrorAlert from "$lib/ui/ErrorAlert.svelte";
  import { goto } from "$app/navigation";

  let email = "";
  let password = "";

  let errorMessage = "";
  const onSubmit = async () => {
    const response = await leafLibraryService.login({
      email,
      password
    });
    if (!response.error) await goto("/garden");
    else errorMessage = response.code === 401 ? "E-mail or password is invalid." : "Server error.";
  };
</script>

<HeroBackground>
  <UserCredentials bind:email bind:password {onSubmit} />
  {#if errorMessage}
    <ErrorAlert text={errorMessage} />
  {/if}
</HeroBackground>
