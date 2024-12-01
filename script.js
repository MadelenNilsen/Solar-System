
async function getApiKey() {
  try {
    let response = await fetch(
      "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys",
      {
        method: "POST",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch API key");
    }
    let data = await response.json();

    return data.key;
  } catch (error) {
    console.error("Error fetching API key:", error);
  }
}

async function fetchPlanets(apiKey) {
  try {
    let response = await fetch(
      "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies",
      {
        method: "GET",
        headers: { "x-zocom": apiKey },
      }
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    let data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching planets:", error);
  }
}

async function loadSolarSystemData() {
  const apiKey = await getApiKey();

  if (!apiKey) {
    console.error("Failed to retrieve API key. Cannot continue.");
    return;
  }

  const planets = await fetchPlanets(apiKey);
  if (!planets || !planets.bodies) {
    console.error("Planets data is missing or malformed.");
    return;
  }

  console.log("Planets data:", planets.bodies);

  const sun = planets.bodies[0];
  const mercury = planets.bodies[1];
  const venus = planets.bodies[2];
  const earth = planets.bodies[3];
  const mars = planets.bodies[4];
  const jupiter = planets.bodies[5];
  const saturn = planets.bodies[6];
  const uranus = planets.bodies[7];
  const neptune = planets.bodies[8];

//   console.log(earth.name);

// document.getElementById("sol").innerHTML = sun;
console.log(planets.bodies);
const planetList = document.getElementById("planet-list");

planets.bodies.forEach((body) => {
    const listItem = document.createElement("li");

    // moon info not working, why
    let moonInfo = "";
    if (body.moons && body.moons.length > 0) {
        moonInfo = `
        <h3>Moons:</h3>
      <ul>
        ${body.moons.map(moon => `<li>${moon.name}: ${moon.description || "No description available."}</li>`).join("")}
      </ul>
        `;
    } else {
        moonInfo = `<p>No moons</p>`;
    }
    //

    listItem.innerHTML = `
    <div class="planet-container">

        <div class="planet-details">
    <h2><b>${body.name}</b></h2>
    <p><b>Latin name: </b> ${body.latinName}</h2>
    <p><b>Type: </b>${body.type}</p>
    <p><b>Rotation: </b>${body.rotation}</p>
    <p><b>Circumference: </b>${body.circumference}</p>
    <p><b>Temperatur Day: </b>${body.temp.day}</p>
    <p><b>Temperatur Night: </b>${body.temp.night}</p>
    <p><b>Distance from Sun: </b>${body.distance}</p>
    <p><b>Orbital Period: </b>${body.orbitalPeriod}</p>
    <p>${body.desc}</p>

    </div>
    </div>
  `;
    
  planetList.appendChild(listItem);
});
 // SEARCH BAR TEST

 const searchBar = document.getElementById("search-bar");
const searchButton = document.getElementById("search-button");
const searchResult = document.getElementById("search-result");
const planetsVisuals = document.querySelectorAll(".planets-drawings > div"); // The div elements for the visual planets

// Function to perform the search
function performSearch() {
  const query = searchBar.value.toLowerCase().trim();
  searchResult.innerHTML = ""; // Clear previous results

  if (query === "") {
    alert("Please enter a planet name to search.");
    return;
  }

  let matches = 0; // Count matches

  // Match search input with planet names
  planets.bodies.forEach((planet, index) => {
    if (planet.name.toLowerCase().includes(query)) {
      matches++;
      
      // Create a search result list item
      const listItem = document.createElement("li");
      listItem.textContent = planet.name;

      // Scroll to the visual planet and highlight it
      listItem.addEventListener("click", function () {
        const visualPlanet = planetsVisuals[index]; // Match the visual planet by index
        visualPlanet.scrollIntoView({ behavior: "smooth", block: "center" });

        // Temporarily highlight the planet
        visualPlanet.classList.add("highlight");
        setTimeout(() => visualPlanet.classList.remove("highlight"), 2000);
      });

      searchResult.appendChild(listItem);

      // Automatically scroll to and highlight the first match
      if (matches === 1) {
        const firstMatch = planetsVisuals[index];
        firstMatch.scrollIntoView({ behavior: "smooth", block: "center" });
        firstMatch.classList.add("highlight");
        setTimeout(() => firstMatch.classList.remove("highlight"), 2000);
      }
    }
  });

  // Handle no matches
  if (matches === 0) {
    const noResult = document.createElement("li");
    noResult.textContent = "No matching planets found.";
    searchResult.appendChild(noResult);
  }
}

// Event listeners
searchButton.addEventListener("click", performSearch);
searchBar.addEventListener("keydown", (e) => {
  if (e.key === "Enter") performSearch();
});

 // SEARCH BAR STOP

}

loadSolarSystemData();