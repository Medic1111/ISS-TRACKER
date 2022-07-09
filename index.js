const longitude = document.querySelector(".longitude");
const latitude = document.querySelector(".latitude");
const timeStamp = document.querySelector(".timeStamp");
const btn = document.querySelector(".btn");
const url = "http://api.open-notify.org/iss-now.json";
let coordinates = [];

const getData = () => {
  fetch(url).then((response) => {
    response.json().then((data) => {
      timeStamp.textContent = data.timestamp;
      latitude.textContent = data.iss_position.latitude;
      longitude.textContent = data.iss_position.longitude;
      coordinates = [data.iss_position.latitude, data.iss_position.longitude];

      const map = L.map("map").setView(coordinates, 3);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker(coordinates)
        .addTo(map)
        .bindPopup(
          "ISS is away above our heads.<br> But just up around this area."
        )
        .openPopup();
    });
  });
};
getData();
