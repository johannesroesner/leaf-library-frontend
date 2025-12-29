<script lang="ts">
  import "leaflet/dist/leaflet.css";
  import { onMount } from "svelte";
  import type * as Leaflet from 'leaflet';
  import { leafletService } from "$lib/services/leaflet-service";
  import { PlantTypeArray } from "$lib/types/leaf-library-types";
  import { currentPlants } from "$lib/runes.svelte";

  let L: typeof Leaflet;
  let mapElement: HTMLElement;
  let map: Leaflet.Map;

  let plantTypeLayers: Record<string, Leaflet.LayerGroup> = {};
  const stateMappingPlantTypes = $derived({
    "Tree": currentPlants.plantsTypeTree,
    "Flower": currentPlants.plantsTypeFlower,
    "Fern": currentPlants.plantsTypeFern,
    "Moss": currentPlants.plantsTypeMoss,
    "Grass": currentPlants.plantsTypeGrass,
    "Aquatic Plant": currentPlants.plantsTypeAquaticPlant,
    "Climber": currentPlants.plantsTypeClimber,
    "Other": currentPlants.plantsTypeOther
  });

  onMount(async () => {
    L = (await import("leaflet")).default;
    const startPosition = await leafletService.getStartPosition();
    map = L.map(mapElement).setView([startPosition.latitude, startPosition.longitude], 8);

    const baseMaps = {
      "Default": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
      }).addTo(map),
      "Topography": L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenTopoMap'
      })
    };

    const overlayMaps: Record<string, L.LayerGroup> = {};
    PlantTypeArray.forEach(type => {
      const group = L.layerGroup();
      plantTypeLayers[type] = group;
      overlayMaps[type] = group;
      group.addTo(map);
    });
    L.control.layers(baseMaps, overlayMaps).addTo(map);

    refreshAllMarkers();
  });


  export  function moveTo(latitude: number, longitude: number) {
    map.flyTo({ lat: latitude, lng: longitude }, 15);
  }

  export function refreshAllMarkers(): void {
    PlantTypeArray.forEach(type => {
      const group = plantTypeLayers[type];
      const plants = stateMappingPlantTypes[type];

      if (group && plants) {
        group.clearLayers();

        plants.forEach(plant => {
          const marker = L.marker([plant.latitude, plant.longitude])
            .bindPopup(`<b>${plant.commonName}</b><br>Type: ${type}`);
          marker.addTo(group);
        });
      }
    });
  }
</script>

<div bind:this={mapElement} class="h-full rounded-2xl shadow-2xl"></div>
