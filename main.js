const appContainer = document.getElementById("app");

function router() {
  const hash = window.location.hash || "#episodes";

  if (hash === "#episodes") {
    loadEpisodes();
  } else if (hash.startsWith("#episode/")) {
    const episodeNumber = hash.split("/")[1];
    loadEpisodeDetails(episodeNumber);
  }
}

async function loadEpisodes() {
  document.getElementById("app-title").textContent = "Star Wars Episodes";
  const response = await fetch("https://swapi.dev/api/films/");
  const data = await response.json();

  const episodes = data.results.sort(
    (a, b) => new Date(a.release_date) - new Date(b.release_date)
  );

  appContainer.innerHTML = '<div class="list-group"></div>';
  const listGroup = appContainer.querySelector(".list-group");

  episodes.forEach((episode, index) => {
    const episodeNumber = index + 1;
    const episodeItem = document.createElement("a");
    episodeItem.href = `#episode/${episodeNumber}`;
    episodeItem.className = "list-group-item list-group-item-action";
    episodeItem.textContent = `Episode ${episodeNumber}: ${episode.title}`;
    listGroup.appendChild(episodeItem);
  });
}

async function loadEpisodeDetails(episodeNumber) {
  document.getElementById(
    "app-title"
  ).textContent = `Episode ${episodeNumber} Details`;
  const response = await fetch(`https://swapi.dev/api/films/${episodeNumber}/`);
  const episode = await response.json();
  //console.log(episode);

  appContainer.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h2 class="card-title">${episode.title}</h2>
                <p class="card-text">${episode.opening_crawl}</p>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><strong>Director:</strong> ${episode.director}</li>
                    <li class="list-group-item"><strong>Producer:</strong> ${episode.producer}</li>
                    <li class="list-group-item"><strong>Release Date:</strong> ${episode.release_date}</li>
                </ul>
            </div>
        </div>
        <a href="#episodes" class="btn btn-primary mt-3">Back to Episodes</a>
    `;
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
