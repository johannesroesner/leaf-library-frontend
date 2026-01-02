<script lang="ts">
  import LoginForm from "./LoginForm.svelte";
  import type { ActionData } from "./$types";
  import { currentPage } from "$lib/runes.svelte";

  currentPage.title = "Login";

  type Props = {
    form: ActionData;
  };
  let { form }: Props = $props();
</script>

<LoginForm {form} />
