<script lang="ts">
  import SignupForm from "./SignupForm.svelte";
  import type { ActionData } from "./$types";
  import { currentPage } from "$lib/runes.svelte";

  currentPage.title = "Signup";

  type Props = {
    form: ActionData;
  };
  let { form }: Props = $props();
</script>

<SignupForm {form} />
