<script lang="ts">
  import { onMount } from "svelte";
  import "leaflet/dist/leaflet.css";

  let { latitude = $bindable(), longitude = $bindable() } = $props();

  let mapElement: HTMLElement;
  let map: L.Map;
  let marker: L.Marker;

  function getCurrentPosition(): Promise<{ latitude: number; longitude: number }> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject();
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) =>
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }),
        reject
      );
    });
  }

  onMount(async () => {
    const L = await import("leaflet");

    let startLatitude = 49.0134;
    let startLongitude = 12.1016;

    try {
      const position = await getCurrentPosition();
      startLatitude = position.latitude;
      startLongitude = position.longitude;
    } catch (error) {
      console.log(error);
    }

    if (!latitude) latitude = startLatitude;
    if (!longitude) longitude = startLongitude;

    map = L.map(mapElement).setView([startLatitude, startLongitude], 4);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap"
    }).addTo(map);

    marker = L.marker([latitude ?? 50, longitude ?? 10], { draggable: true }).addTo(map);

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

<div bind:this={mapElement} class="h-64 w-full rounded-lg border"></div>
