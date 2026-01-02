<script lang="ts">
  import { enhance } from "$app/forms";

  let { updateStatus = $bindable(false), deleteAction = null } = $props();

  function goBack() {
    history.back();
  }
  function setUpdateStatus() {
    updateStatus = !updateStatus;
  }
</script>

<div class="mb-5 flex items-center justify-between">
  <button class="btn btn-neutral" type="button" onclick={goBack}> Back </button>
  <div class="space-x-2">
    <button class="btn btn-neutral" type="submit" onclick={setUpdateStatus}> Update </button>
    {#if deleteAction}
      <form action={deleteAction} method="POST" use:enhance class="inline">
        <button type="submit" class="btn btn-error"> Delete </button>
      </form>
    {/if}
  </div>
</div>
