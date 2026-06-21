// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area=";

const input = document.getElementById("state-input");
const button = document.getElementById("fetch-alerts");
const alertsDisplay = document.getElementById("alerts-display");
const errorMessage = document.getElementById("error-message");

button.addEventListener("click", () => {
  const state = input.value;

  fetch(`${weatherApi}${state}`)
    .then(response => response.json())
    .then(data => {
      // Clear any previous error
      errorMessage.textContent = "";
      errorMessage.classList.add("hidden");

      const alerts = data.features || [];

      alertsDisplay.innerHTML = `Weather Alerts: ${alerts.length}`;

      alerts.forEach(alert => {
        const p = document.createElement("p");
        p.textContent = alert.properties.headline;
        alertsDisplay.appendChild(p);
      });

      // Clear input after successful fetch
      input.value = "";
    })
    .catch(error => {
      errorMessage.textContent = error.message;
      errorMessage.classList.remove("hidden");

      // Clear input after failed fetch
      input.value = "";
    });
});