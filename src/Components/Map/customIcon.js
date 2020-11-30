import L from "leaflet";

const html = `
<span class="icon-marker">
<span class="icon-marker-tooltip">
  <h2>test</h2>
  <ul>
    <li><strong>Confirmed:</strong>test </li>
    <li><strong>Deaths:</strong>test </li>
    <li><strong>Recovered:</strong> test</li>
    <li><strong>Last Update:</strong> test</li>
  </ul>
</span>
test
</span>
`;

const customIcon = new L.divIcon({
  className: "icon",
  html,
});

export { customIcon };
