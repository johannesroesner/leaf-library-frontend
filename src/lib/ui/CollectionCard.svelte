<script>
  import { goto } from '$app/navigation';

  let { name, image, description, id} = $props();
</script>

<div class="card lg:card-side bg-base-300 shadow-2xl">
  <figure class="w-100 h-48 overflow-hidden">
    <img
      src={image}
      alt={name}
      class="h-full w-full object-cover"
    />
  </figure>

  <div class="card-body">
    <h2 class="card-title">{name}</h2>
    <p class="text-sm italic opacity-70">
      {description}
    </p>

    <div class="card-actions justify-end">
      <button
        class="btn btn-primary"
        onclick={() => goto(`/collections/${id}`)}
      >
        Details
      </button>
    </div>
  </div>
</div>
