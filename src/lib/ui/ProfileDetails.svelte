<script lang="ts">
  import ImageUploader from "$lib/ui/ImageUploader.svelte";

  interface Props {
    firstName?: string;
    secondName?: string;
    email?: string;
    aboutMe?: string;
    image?: File[];
    submitButtonText: string;
    title: string;
  }
  let {
    firstName = $bindable(""),
    secondName = $bindable(""),
    email = $bindable(""),
    aboutMe = $bindable(""),
    image = $bindable([]),
    submitButtonText,
    title
  }: Props = $props();

  const allFieldsFilled = $derived(
    firstName.trim() !== "" && secondName.trim() !== "" && email.trim() !== ""
  );

  const firstNameHasNoSpaces = $derived(/^\S*$/.test(firstName));
  const secondNameHasNoSpaces = $derived(/^\S*$/.test(secondName));

  const isFormValid = $derived(allFieldsFilled && firstNameHasNoSpaces && secondNameHasNoSpaces);
</script>

<fieldset
  class="mt-5 fieldset w-full rounded-box border border-base-300 bg-base-200 p-4 shadow-2xl"
>
  <legend class="fieldset-legend">{title}</legend>
  <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
    <div class="flex flex-col gap-4">
      <div>
        <label class="label" for="first-name">First Name</label>
        <input
          name="firstName"
          id="first-name"
          bind:value={firstName}
          type="text"
          class="input w-full"
          placeholder="First Name"
          required
        />
        {#if !firstNameHasNoSpaces}
          <p class="mt-2 text-xs text-error">First name cannot contain spaces</p>
        {/if}
      </div>
      <div>
        <label class="label" for="second-name">Second Name</label>
        <input
          name="secondName"
          id="second-name"
          bind:value={secondName}
          type="text"
          class="input w-full"
          placeholder="Second Name"
          required
        />
        {#if !secondNameHasNoSpaces}
          <p class="mt-2 text-xs text-error">Second name cannot contain spaces</p>
        {/if}
      </div>

      <div>
        <label class="label" for="email">E-mail</label>
        <input
          name="email"
          id="email"
          bind:value={email}
          type="text"
          class="input w-full"
          placeholder="E-mail"
          required
        />
      </div>

      <div>
        <label class="label" for="about-me">About Me</label>
        <input
          name="aboutMe"
          id="about-me"
          bind:value={aboutMe}
          type="text"
          class="input w-full"
          placeholder="About Me"
        />
      </div>
    </div>
    <div class="flex w-full">
      <ImageUploader bind:images={image} multiple={false} />
    </div>
  </div>
  <button class="btn mt-6 w-full btn-primary" type="submit" disabled={!isFormValid}>
    {submitButtonText}
  </button>
</fieldset>
