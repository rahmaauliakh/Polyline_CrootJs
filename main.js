import { createMap, addGeoJSON, fitMap } from "https://cdn.jsdelivr.net/gh/crootjs/lib@0.0.16/map.js";
import { onClick, setInner } from "https://cdn.jsdelivr.net/gh/crootjs/lib@0.0.16/element.js";
import { parseGeoJSON } from "https://cdn.jsdelivr.net/gh/crootjs/lib@0.0.16/geo.js";

const statusId = "appStatus";
const mapId = "map";

const data = await fetch("./rute_gojek.geojson")
  .then((response) => {
    if (!response.ok) throw new Error("Gagal memuat rute_gojek.geojson");
    return response.json();
  })
  .then((json) => parseGeoJSON(json));

if (!data) {
  setInner(statusId, "Data GeoJSON tidak valid. Periksa file rute_gojek.geojson.");
  throw new Error("GeoJSON tidak valid");
}

createMap(mapId, {
  center: [107.5757, -6.87298],
  zoom: 17,
  maxZoom: 19
});

addGeoJSON(mapId, data, {
  style: (feature) => {
    const props = feature.properties || {};
    if (props.jenis === "Jalan") {
      return { stroke: "#64748b", strokeWidth: 5, strokeOpacity: 0.95, fill: "#64748b", radius: 6 };
    }
    if (props.jenis === "Rute Transportasi") {
      return { stroke: "#00a86b", strokeWidth: 6, strokeOpacity: 1, fill: "#00a86b", radius: 6 };
    }
    if (props.kategori === "Pickup") {
      return { stroke: "#ffffff", strokeWidth: 3, fill: "#00a86b", radius: 9 };
    }
    if (props.kategori === "Dropoff") {
      return { stroke: "#ffffff", strokeWidth: 3, fill: "#e34b59", radius: 9 };
    }
    return null;
  },
  popup: (feature) => {
    const props = feature.properties || {};
    if (props.ongkos_rp) return `${props.nama} — ongkos simulasi Rp${props.ongkos_rp.toLocaleString("id-ID")}`;
    return props.nama || props.kategori || props.jenis || "Fitur GeoJSON";
  }
});

fitMap(mapId, data);
setInner(statusId, "CrootJS map.js aktif. Data GeoJSON berhasil dimuat.");

onClick("fitRoute", () => {
  fitMap(mapId, data);
  setInner(statusId, "Tampilan peta difokuskan ke semua fitur rute.");
});

onClick("downloadGeoJSON", () => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/geo+json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "rute_gojek.geojson";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  setInner(statusId, "Unduhan GeoJSON dimulai.");
});
