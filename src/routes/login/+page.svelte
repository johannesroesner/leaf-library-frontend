<script lang="ts">
  import LoginForm from "./LoginForm.svelte";
  import type { ActionData } from "./$types";
  type Props = {
    form: ActionData;
  };
  let { form }: Props = $props();
</script>

<LoginForm {form} />
