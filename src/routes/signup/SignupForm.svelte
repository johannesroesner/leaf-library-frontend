<script>
  import HeroBackground from "$lib/ui/HeroBackground.svelte";
  import UserDetails from "$lib/ui/UserDetails.svelte";
  import { leafLibraryService } from "$lib/services/leaf-library-service.js";
  import ErrorAlert from "$lib/ui/ErrorAlert.svelte";
  import { goto } from "$app/navigation";

  let firstName = "";
  let secondName = "";
  let email = "";
  let password = "";

  let errorMessage = "";
  const onSubmit = async () => {
    const response = await leafLibraryService.signup({
      firstName,
      secondName,
      email,
      password
    });
    if (!response.error) await goto("/login");
    else errorMessage = response.code === 409 ? "E-mail is already taken." : "Server error.";
  };
</script>

<HeroBackground>
  <UserDetails bind:firstName bind:secondName bind:email bind:password {onSubmit} />
  {#if errorMessage}
    <ErrorAlert text={errorMessage} />
  {/if}
</HeroBackground>
