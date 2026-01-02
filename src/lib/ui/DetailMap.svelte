<script lang="ts">
  import "leaflet/dist/leaflet.css";
  import type * as Leaflet from "leaflet";
  import { onMount } from "svelte";
  import { leafletService } from "$lib/services/leaflet-service.js";

  interface Props {
    latitude: number;
    longitude: number;
    mapType: "default" | "topography";
  }
  let { latitude, longitude, mapType }: Props = $props();

  let L: typeof Leaflet;
  let mapElement: HTMLElement;
  let map: Leaflet.Map;

  onMount(async () => {
    L = (await import("leaflet")).default;
    map = L.map(mapElement).setView([latitude, longitude], 15);

    const greenIcon = leafletService.createGreenIcon(L);
    L.marker([latitude, longitude], { icon: greenIcon }).addTo(map);

    if (mapType === "default") {
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap"
      }).addTo(map);
    } else if (mapType === "topography") {
      L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          attribution:
            "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
        }
      ).addTo(map);
    }
  });
</script>

<div class="h-100 w-full overflow-hidden rounded-2xl bg-base-300 shadow-2xl">
  <div bind:this={mapElement} class="h-full w-full"></div>
</div>
