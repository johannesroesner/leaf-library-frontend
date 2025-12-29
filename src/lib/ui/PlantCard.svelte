<script lang="ts">
  import { goto } from "$app/navigation";

  let {
    images,
    commonName,
    scientificName,
    type,
    biome,
    note,
    id,
    plantFunction,
    plantFunctionKey,
    mapEvent = null
  } = $props();

</script>

<div class="hover-3d card w-63 rounded-2xl bg-base-300 shadow-2xl card-xs "
     onclick={() => mapEvent(id)}
     onkeydown={() => { mapEvent(id)}}
     role="button"
     tabindex="0">
  <div>
    <figure class="relative h-42 rounded-t-2xl">
      {#if images?.[0]}
        <img src={images[0]} alt={commonName} class="h-full w-full object-cover" />
      {:else}
        <div class="flex h-full w-full items-center justify-center bg-gray-300 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-12 opacity-50"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
        </div>
      {/if}
    </figure>

    <div class="card-body">
      <h2 class="card-title text-2xl">
        {commonName}
      </h2>
      <p class="text-sm italic opacity-70">{scientificName}</p>

      <div class="mt-2 flex justify-between">
        <div class="flex gap-2">
          <div class="badge badge-secondary">{type}</div>
          <div class="badge badge-secondary">{biome}</div>
        </div>
        {#if plantFunction && plantFunctionKey}
          <button class="btn btn-primary" onclick={() => plantFunction?.(id)}>
            {plantFunctionKey}
          </button>
        {/if}
      </div>

      {#if note}
        <p class="mt-4 line-clamp-3 text-sm">{note}</p>
      {/if}

      <div class="mt-4 card-actions justify-end">
        <button class="btn btn-xs btn-primary" onclick={() => goto(`/plants/${id}`)}>
          Details
        </button>
      </div>
    </div>
  </div>

  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
