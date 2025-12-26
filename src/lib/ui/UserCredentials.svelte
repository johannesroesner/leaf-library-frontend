<script lang="ts">
  let { email = $bindable(""), password = $bindable(""), onSubmit } = $props();

  const allFieldsFilled = $derived(email.trim() !== "" && password.trim() !== "");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = $derived(emailRegex.test(email));
  const isFormValid = $derived(allFieldsFilled && isEmailValid);
</script>

<fieldset class="fieldset w-xs rounded-box border border-base-300 bg-base-200 p-4">
  <legend class="fieldset-legend">Login</legend>

  <label class="label" for="email">E-mail</label>
  <input id="email" bind:value={email} type="email" class="input" placeholder="E-mail" />

  <label class="label" for="password">Password</label>
  <input id="password" bind:value={password} type="password" class="input" placeholder="Password" />

  <button class="btn mt-4 btn-neutral" onclick={onSubmit} disabled={!isFormValid}>Login</button>

  <p class="mt-4 text-center text-sm text-base-content/70">
    Don't have an account yet?
    <a href="/signup" class="link font-semibold text-primary link-hover"> Sign up </a>
  </p>

  <div class="flex w-full items-center justify-center">
    <a
      aria-label="Login via GitHub"
      href="/"
      class="mt-4 link text-center text-sm font-semibold text-base-content/70 link-hover"
    >
      <svg
        aria-label="GitHub logo"
        width="24"
        height="24"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        ><path
          fill="white"
          d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
        ></path></svg
      >
    </a>
  </div>
</fieldset>
