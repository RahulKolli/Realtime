// const socket = io();

// if (navigator.geolocation) {
//     navigator.geolocation.watchPosition((position) => {
//         const { latitude, longitude } = position.coords;
//         socket.emit("send-location", { latitude, longitude });
//     }, (error) => {
//         console.log("Error");
//     },
//         {
//             enableHighAccuracy: true,
//             timeout: 5000,
//             maximumAge: 0,
//         }
//     );
// }
// const map = L.map("map").setView([0, 0], 10);
// L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//     attribution: "Real-Time Live Location by Rahul"
// }).addTo(map);

// const markers = {};
// socket.on("receive-location", (data) => {
//     const { id, latitude, longitude } = data;

//     map.setView([latitude, longitude], 16);
//     if (markers[id]) {
//         markers[id].setLatLng([latitude, longitude]);
//     } else {
//         markers[id] = L.marker([latitude, longitude])
//             .addTo(map);

//     }
// });

// socket.on("user-disconnected",(id)=>{
// if (markers[id]){
//     map.removeLayer(markers[id]);
//     delete markers[id];
// }
// })

const socket = io();
const map = L.map("map").setView([12.9716, 77.5946], 14);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "Real-Time Live Location by Rahul"
}).addTo(map);

let movingMarker;

// Function to fetch route from OpenRouteService (ORS)
async function getRoute(start, end) {
    const apiKey = "5b3ce3597851110001cf6248ff072bc7a7494e8d978bfbf476910e4d"; 
    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${start[1]},${start[0]}&end=${end[1]},${end[0]}`;

    const response = await fetch(url);
    const data = await response.json();
    return data.features[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
}

// Function to animate the movement
async function startSimulation() {
    const start = [12.9716, 77.5946]; // Start Location
    const end = [12.9352, 77.6245];   // End Location
    const routeCoordinates = await getRoute(start, end);

    // Draw the route on the map
    const route = L.polyline(routeCoordinates, { color: 'blue', weight: 5 }).addTo(map);

    // Place the moving marker at the starting point
    movingMarker = L.marker(routeCoordinates[0]).addTo(map);
    map.setView(routeCoordinates[0], 14);

    let index = 0;
    const moveInterval = setInterval(() => {
        if (index >= routeCoordinates.length - 1) {
            clearInterval(moveInterval);
            return;
        }

        index++;
        const [lat, lng] = routeCoordinates[index];

        movingMarker.setLatLng([lat, lng]);
        map.setView([lat, lng], 14); // Keep map centered
    }, 1000); // Move every second
}

// Start the movement simulation
startSimulation();

// Real-time user location tracking
if (navigator.geolocation) {
    navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords;
        socket.emit("send-location", { latitude, longitude });
    }, (error) => {
        console.log("Error getting location");
    }, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    });
}

const markers = {};
socket.on("receive-location", (data) => {
    const { id, latitude, longitude } = data;

    if (!markers[id]) {
        markers[id] = L.marker([latitude, longitude]).addTo(map)
            .bindPopup(`User: ${id}`)
            .openPopup();
    } else {
        markers[id].setLatLng([latitude, longitude]);
    }

    map.setView([latitude, longitude], 14);
});

// Handle user disconnect
socket.on("user-disconnected", (id) => {
    if (markers[id]) {
        map.removeLayer(markers[id]);
        delete markers[id];
    }
});
