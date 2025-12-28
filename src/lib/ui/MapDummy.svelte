<script lang="ts">
  let { text } = $props();
</script>

<div class="card bg-base-200 shadow">
  <div class="card-body">
    <h3 class="card-title">{text}</h3>
    <div class="flex h-64 items-center justify-center rounded-box bg-base-300">
      <span class="opacity-60">Placeholder</span>
    </div>
  </div>
</div>
