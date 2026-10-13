# Rute GoRide ULBI — CrootJS native map

Project ini memakai modul peta asli CrootJS (`map.js`), bukan Leaflet.

## File
- `index.html`: struktur halaman, memuat CSS dan ES module terpisah.
- `style.css`: tampilan responsif.
- `main.js`: membuat peta CrootJS, memuat GeoJSON, memberi gaya garis/titik, dan menangani tombol dengan `element.js`.
- `rute_gojek.geojson`: data contoh polyline, rute GoRide simulasi, pickup, drop-off.

## Menjalankan
Gunakan VS Code Live Server agar `fetch("./rute_gojek.geojson")` berjalan pada HTTP, bukan membuka HTML lewat `file://`.

## GitHub Pages
Upload seluruh file ke root repository, lalu Settings → Pages → Deploy from a branch → `main` → `/(root)` → Save.

Catatan: ongkos Rp10.000 dan garis rute adalah simulasi. Peta dasar memakai tile OpenStreetMap sesuai kebijakan penggunaan server tile mereka.
