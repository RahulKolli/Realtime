Real-Time GPS Tracking with Live Route Simulation by Rahul Kolli
=================================================================

NOTE: Resume inside the project directory

Portifolio : [rahul.work.gd](https://rahul.work.gd/)

🚀 Project Overview
-------------------
This project implements a real-time GPS tracking system using Leaflet.js, OpenRouteService API, and Socket.io. 
It simulates live movement along a predefined route while tracking actual user locations.

🛠 Features
-----------
✔ Real-Time Location Sharing: Users' locations update dynamically on the map.  
✔ Live Route Simulation: A virtual car follows a predefined route.  
✔ Custom Marker (Car Icon): A car icon replaces the default marker.  
✔ User Connection & Disconnection Handling.  
✔ Automatic Map Centering: The map adjusts to follow user movement.  
✔ Smooth Movement Animation: The car moves along the route naturally.  

📂 Project Structure
---------------------
📦 Real-Time GPS Tracker  
├── 📂 public  
│   ├── 📂 images  
│   │   ├── car.png (Car icon for marker)  
│   ├── 📜 script.js (Client-side logic)  
│   ├── 📜 styles.css (Optional styling)  
├── 📂 views  
│   ├── 📜 index.ejs (Frontend UI)  
├── 📜 server.js (Node.js + Express backend)  
├── 📜 package.json (Dependencies)  

🚀 How to Run the Project
-------------------------
1️⃣ Install Dependencies  
   npm install  

2️⃣ Start the Server  
   node server.js  

   **Ensure `public/images/car.png` is correctly placed.**

3️⃣ Open in Browser  
   http://localhost:3000  

🛠 Technologies Used
--------------------
- Frontend: Leaflet.js, OpenRouteService API  
- Backend: Node.js, Express, Socket.io  
- Map Service: OpenStreetMap  
- Real-time Communication: WebSockets (Socket.io)  

📌 Final Notes
--------------
- Ensure `car.png` exists in `public/images/` for the marker.  
- Open multiple tabs to test multiple user tracking.  
- Modify `startSimulation()` to change the predefined route.  
- Works best with high-accuracy location tracking enabled.  

✅ This project successfully demonstrates real-time GPS tracking and live route simulation for a moving object.  

