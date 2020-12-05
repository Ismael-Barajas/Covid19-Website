// import React, { useRef, useState } from "react";
// import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
// import { api2FetchCountries, api2FetchStateData } from "../../api";
// import L from "leaflet";
// import useSwr from "swr";
// import axios from "axios";
// import useSupercluster from "use-supercluster";
// import coronaIMG from "../../images/coronavirusSmall.png";

// //Counties api
// const url3 = "https://corona.lmao.ninja/v3/covid-19/jhucsse/counties";

// //fetcher for map counties
// const fetcherties = (url) => axios.get(url).then((res) => res.data);

// const corona = new L.Icon({
//   iconUrl: coronaIMG,
//   iconSize: [20, 20],
// });

// const icons = {};
// const fetchIcon = (count, size) => {
//   if (!icons[count]) {
//     icons[count] = L.divIcon({
//       html: `<div class="cluster-marker" style="width: ${size}px; height: ${size}px;">
//         ${count}
//       </div>`,
//     });
//   }
//   return icons[count];
// };

// // async function stateData() {
// //   const {data = []} = await api2FetchStateData()
// //   return data;
// // };

// export default function MyMap() {
//   // Map base center
//   const position = [0, 0];
//   //state and refs
//   const [bounds, setBounds] = useState(null);
//   const [zoom, setZoom] = useState(2);
//   const mapRef = useRef(null);


//   //get map bounds
//   function updateMap() {
//     const b = mapRef.current.leafletElement && mapRef.current.leafletElement.getBounds();
//     setBounds([
//       b.getSouthWest().lng,
//       b.getSouthWest().lat,
//       b.getNorthEast().lng,
//       b.getNorthEast().lat,
//     ]);
//     setZoom(mapRef.current.leafletElement.getZoom());
//   }

//   React.useEffect(() => {
//     updateMap();
//   }, []);

//   //load and prep data
//   const { data, error } = useSwr(url3, fetcherties);
//   const stateCounties = data && !error ? data : [];
//   const statePoints = stateCounties.map((counties) => ({
//     type: "Feature",
//     //in properties i think i can add the stats for each county, but for now im just trying to make the clusters
//     properties: {
//       cluster: false,
//       countyId: counties.county,
//       province: counties.province,
//     },
//     geometry: {
//       type: "Point",
//       coordinates: [
//         counties.coordinates.longitude,
//         counties.coordinate.latitude,
//       ],
//     },
//   }));

//   // get clusters
//   const { clusters, supercluster } = useSupercluster({
//     points: statePoints,
//     bounds,
//     zoom,
//     options: { radius: 100, maxZoom: 20 },
//   });

//   return (
//     <MapContainer
//       className="map"
//       center={position}
//       zoom={2}
//       style={{ height: 1000, width: "56%" }}
//       maxBounds={[
//         [-90, -180],
//         [90, 180],
//       ]}
//       minZoom={2}
//       onMoveEnd={updateMap}
//       ref={mapRef}
//     >
//       <TileLayer
//         attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
//         url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
//         noWrap="true"
//       />
//       {clusters.map((cluster) => {
//         // every cluster point has coordinates
//         const [longitude, latitude] = cluster.geometry.coordinates;
//         // the point may be either a cluster or a crime point
//         const {
//           cluster: isCluster,
//           point_count: pointCount,
//         } = cluster.properties;

//         // we have a cluster to render
//         if (isCluster) {
//           return (
//             <Marker
//               key={`cluster-${cluster.id}`}
//               position={[latitude, longitude]}
//               icon={fetchIcon(
//                 pointCount,
//                 10 + (pointCount / statePoints.length) * 40
//               )}
//               onClick={() => {
//                 const expansionZoom = Math.min(
//                   supercluster.getClusterExpansionZoom(cluster.id),
//                   17
//                 );
//                 const leaflet = mapRef.current.leafletElement;
//                 leaflet.setView([latitude, longitude], expansionZoom, {
//                   animate: true,
//                 });
//               }}
//             ></Marker>
//           );
//         }
//         // we have a single point (county) to render
//         return (
//           <Marker
//             key={`county-${cluster.properties.countyId}`}
//             position={[latitude, longitude]}
//             icon={corona}
//           ></Marker>
//         );
//       })}
//     </MapContainer>
//   );
// }

// /*
// things to do:
// data might break, trouble shoot this shit ooooooo
// this is just counties, need to do contries as well
// add data on click for counties but not contries
// MAKE IT WORK DUDE OOOOOOO
// */
