<script lang="ts">
  import SignupForm from "./SignupForm.svelte";
  import type { ActionData } from "./$types";
  type Props = {
    form: ActionData;
  };
  let { form }: Props = $props();
</script>

<SignupForm {form} />
