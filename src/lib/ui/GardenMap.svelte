<script lang="ts">
  import "leaflet/dist/leaflet.css";
  import { onMount } from "svelte";
  import type * as Leaflet from "leaflet";
  import { leafletService } from "$lib/services/leaflet-service";
  import { currentPlantFilter, currentPlants } from "$lib/runes.svelte";

  let L: typeof Leaflet;
  let mapElement: HTMLElement;
  let map: Leaflet.Map;
  let markerGroup: Leaflet.LayerGroup;

  export function updateMarkers() {
    if (!map || !L || !markerGroup) return;

    markerGroup.clearLayers();
    currentPlants.filteredList.forEach((plant) => {
      const detailsLink = `<a href="/plants/${plant._id}" class="font-bold">Details</a>`;

      const greenIcon = leafletService.createGreenIcon(L);
      L.marker([plant.latitude, plant.longitude], { icon: greenIcon })
        .bindPopup(
          `
        <div class="p-1">
          <b class="text-lg">${plant.commonName}</b><br>
          <span class="text-sm opacity-70">Typ: ${plant.type}</span>
          <div class="mt-2 pt-2">
            ${detailsLink}
          </div>
        </div>
      `
        )
        .addTo(markerGroup);
    });
  }

  $effect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const trigger = currentPlants.filteredList;
    updateMarkers();
  });

  onMount(async () => {
    L = (await import("leaflet")).default;
    const startPosition = await leafletService.getStartPosition();
    map = L.map(mapElement).setView([startPosition.latitude, startPosition.longitude], 8);

    const baseMaps = {
      Default: L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap"
      }).addTo(map),
      Satellite: L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          attribution:
            "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
        }
      ),
      Topography: L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenTopoMap",
        maxZoom: 16
      })
    };
    L.control.layers(baseMaps).addTo(map);

    markerGroup = L.layerGroup().addTo(map);
    currentPlantFilter.value = "all";
    updateMarkers();
  });

  export function moveTo(latitude: number, longitude: number) {
    map.flyTo({ lat: latitude, lng: longitude }, 15);
  }
</script>

<div bind:this={mapElement} class="h-full rounded-2xl shadow-2xl"></div>
