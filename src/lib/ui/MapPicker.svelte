<script lang="ts">
  import { onMount } from "svelte";
  import type * as Leaflet from "leaflet";
  import "leaflet/dist/leaflet.css";
  import { leafletService } from "$lib/services/leaflet-service.js";

  let { latitude = $bindable(), longitude = $bindable() } = $props();

  let mapElement: HTMLElement;
  let map: Leaflet.Map;
  let marker: Leaflet.Marker;

  onMount(async () => {
    const L = await import("leaflet");

    let startPosition = await leafletService.getStartPosition();

    if (!latitude) latitude = startPosition.latitude;
    if (!longitude) longitude = startPosition.longitude;

    map = L.map(mapElement).setView([startPosition.latitude, startPosition.longitude], 8);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap"
    }).addTo(map)

    // credits for the colored marker icons: https://github.com/pointhi/leaflet-color-markers
    const redIcon = new L.Icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    marker = L.marker([latitude, longitude], { draggable: true, icon: redIcon }).addTo(map);

    map.on("click", (event) => {
      latitude = event.latlng.lat;
      longitude = event.latlng.lng;
      updateMap();
    });

    marker.on("dragend", () => {
      const position = marker.getLatLng();
      latitude = position.lat;
      longitude = position.lng;
    });
  });

  function updateMap() {
    const lat = Number(latitude);
    const lon = Number(longitude);

    if (Number.isFinite(lat) && Number.isFinite(lon)) {
      marker.setLatLng([lat, lon]);
      map.panTo([lat, lon]);
    }
  }
</script>

<div class="mb-4 grid grid-cols-2 gap-4">
  <div class="form-control">
    <label class="label text-xs" for="latitude">Latitude</label>
    <input
      id="latitude"
      type="number"
      step="any"
      bind:value={latitude}
      onchange={() => updateMap()}
      class="input input-sm"
    />
  </div>

  <div class="form-control">
    <label class="label text-xs" for="longitude">Longitude</label>
    <input
      id="longitude"
      type="number"
      step="any"
      bind:value={longitude}
      onchange={() => updateMap()}
      class="input input-sm"
    />
  </div>
</div>

<div bind:this={mapElement} class="h-64 w-full rounded-lg shadow-2xl"></div>
