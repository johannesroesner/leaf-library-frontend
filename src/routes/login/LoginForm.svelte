<script>
  import HeroBackground from "$lib/ui/HeroBackground.svelte";
  import UserCredentials from "$lib/ui/UserCredentials.svelte";
  import { leafLibraryService } from "$lib/services/leaf-library-service.js";
  import { goto } from "$app/navigation";
	import { util } from '$lib/services/leaf-library-utils.js';
	import Toast from '$lib/ui/Toast.svelte';

  let email = "";
  let password = "";

  let errorMessage = "";
  const onSubmit = async () => {
    const response = await leafLibraryService.login({
      email,
      password
    });
    if (!response.error) {
			await util.updateData()
			await goto("/garden");
		}
    else errorMessage = response.code === 401 ? "E-mail or password is invalid." : "Server error.";
  };
</script>

<HeroBackground>
  <UserCredentials bind:email bind:password {onSubmit} />
	{#if errorMessage}
		<Toast text={errorMessage} type="error" />
	{/if}
</HeroBackground>
