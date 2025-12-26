<script lang="ts">
  import heroImage from "$lib/assets/digital-garden.png";
  let { children } = $props();
</script>

<div class="hero min-h-screen" style="background-image: url({heroImage});">
  <div class="hero-overlay"></div>
  <div class="hero-content text-center text-neutral-content">
    <div class="max-w-md">
      {@render children()}
    </div>
  </div>
</div>
