<script lang="ts">
  let {updateStatus = $bindable(false), deleteFunction} = $props();

  function goBack() {
    history.back();
  }
  function setUpdateStatus() {
    updateStatus = !updateStatus;
  }
</script>

<div class="flex justify-between items-center mb-5">
  <button class="btn btn-neutral" onclick={goBack}>
    Back
  </button>
  <div class="space-x-2">
    <button class="btn btn-neutral" onclick={setUpdateStatus}>
      Update
    </button>
    <button class="btn btn-error" onclick={deleteFunction}>
      Delete
    </button>
  </div>
</div>