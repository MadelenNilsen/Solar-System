
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


console.log(planets.bodies);
const planetList = document.getElementById("planet-list");

planets.bodies.forEach((body) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
  <section class="planet-container">
    <section class="planet-details">
        <h2><b>${body.name}</b></h2>
        <p><b>Latin: </b> ${body.latinName}</p>
        <p><b>Typ: </b>${body.type}</p>
        <p><b>Rotation: </b>${body.rotation} jorddygn</p>
        <p><b>Omkrets: </b>${body.circumference} km</p>
        <p><b>Temperatur Dag: </b>${body.temp.day} &deg;C</p>
        <p><b>Temperatur Natt: </b>${body.temp.night} &deg;C</p>
        <p><b>Avstånd från Solen: </b>${body.distance} km</p>
        <p><b>Omloppsperiod: </b>${body.orbitalPeriod} jorddagar</p><br>
        <p><b>Beskrivning:  </b>${body.desc}</p><br>

        <p><b>Månar:</b></p>
        <section class="moons-list">
            ${body.moons && body.moons.length > 0 ? body.moons.map(moon => `<span class="moon-name">${moon}</span>`).join(', ') : "Saknar månar"}
        </section>
    </section>
</section>
  `;
    
  planetList.appendChild(listItem);
});

 // SEARCH BAR START
const searchBar = document.getElementById("search-bar");
const searchButton = document.getElementById("search-button");
const clearButton = document.getElementById("clear-button");
const searchResult = document.getElementById("search-result");
const planetsVisuals = document.querySelectorAll(".planets-drawings > section"); // The elements for the visual planets

// Function to perform search
function performSearch() {
  const query = searchBar.value.toLowerCase().trim();
  searchResult.innerHTML = ""; // Clear previous results

  if (query === "") {
    alert("Du måste skriva in en planet för att söka.");
    return;
  }

  let matches = 0; // Count matches

  // Match search input with planet names
  planets.bodies.forEach((planet, index) => {
    if (planet.name.toLowerCase().includes(query)) {
      matches++;

       // Create a search result section for the planet details
       const listItem = document.createElement("section");
       listItem.classList.add("planet-container");
       listItem.innerHTML = `
         <section class="planet-details">
             <h2><b>${planet.name}</b></h2>
             <p><b>Latin: </b> ${planet.latinName}</p>
             <p><b>Typ: </b>${planet.type}</p>
             <p><b>Rotation: </b>${planet.rotation} jorddygn</p>
             <p><b>Omkrets: </b>${planet.circumference} km</p>
             <p><b>Temperatur Dag: </b>${planet.temp.day} &deg;C</p>
             <p><b>Temperatur Natt: </b>${planet.temp.night} &deg;C</p>
             <p><b>Avstånd från Solen: </b>${planet.distance} km</p>
             <p><b>Omloppsperiod: </b>${planet.orbitalPeriod} jorddagar</p><br>
             <p><b>Beskrivning: </b>${planet.desc}</p><br>
             <p><b>Månar:</b></p>
             <section class="moons-list">
                 ${planet.moons && planet.moons.length > 0
                   ? planet.moons.map(moon => `<span class="moon-name">${moon}</span>`).join(', ')
                   : "Saknar månar"}
             </section>
         </section>
       `;
       searchResult.appendChild(listItem); //NEW
    //    listItem.scrollIntoView({ behavior: "smooth", block: "center" }); //NEW


      // Scroll to the visual planet and highlight it DONT DELETE
      listItem.addEventListener("click", function () {
        const visualPlanet = planetsVisuals[index]; // Match the visual planet by index
        // visualPlanet.scrollIntoView({ behavior: "smooth", block: "center" });

        // Temporarily highlight the planet being serched for in white circle
        visualPlanet.classList.add("highlight");
        setTimeout(() => visualPlanet.classList.remove("highlight"), 2000);
      });

      searchResult.appendChild(listItem);

    }
  });

  // IF no matches found, put "No matching planets found"
  if (matches === 0) {
    const noResult = document.createElement("li");
    noResult.textContent = "No matching planets found.";
    searchResult.appendChild(noResult);
  }
}

// Event listeners
searchButton.addEventListener("click", performSearch);
searchBar.addEventListener("keydown", (e) => {
  if (e.key === "Enter") performSearch(); // Search when pressing down enter key
});

clearButton.addEventListener("click", function() {
    searchBar.value = ""; //clears search bar
    searchResult.innerHTML = ""; //Clear the search result
});
 // SEARCH BAR STOP


 //STARS START
 function drawBackground() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
 }
 const canvas = document.getElementById("starCanvas"); //getting id to target stars
 const ctx = canvas.getContext("2d");
 canvas.width = window.innerWidth;
 canvas.height = window.innerHeight;
 
 function drawStars() { 
     for (let i = 0; i <100; i++) {
         const x = Math.random() * canvas.width;
         const y = Math.random() * canvas.height;
         const size = Math.random() * 2;
         ctx.fillStyle = "white";
         ctx.beginPath();
         ctx.arc(x, y, size, 0, Math.PI * 2);
         ctx.fill();
     }
 }
 drawBackground();
  drawStars();
 //STARS STOP

}

loadSolarSystemData();