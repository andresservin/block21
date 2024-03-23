const COHORT = "2109-CPU-RM-WEB-PT";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/artists`;

const state = {
  artists: [],
};

const artistList = document.querySelector("#artists");

const addArtistForm = document.querySelector("#addArtist");

addArtistForm.addEventListener("submit", addArtist);

async function render() {
  await getArtists();
  renderArtists();
}
render();
async function getArtists() {
  try {
    const response = await fetch(API_URL);
    const json = await response.json();
    state.artists = json.data;
  } catch (error) {
    console.error(error);
  }
}

function renderArtists() {

  if (state.artists.length === 0) {
    artistList.innerHTML = "<li>No artists.<li>";
    return;
  }
  const artistCards = state.artists.map ((artist) => {
    const li = document.createElement("li");
    li.innerHTML = `
    <h2>${artist.name}</h2>
    <img src= "${artist.imageUrl}" alt="${artist.name}" />
    <p>${artist.description}</p>
    `;
    return li;
});

  artistList.innerHTML = "";
  artistCards.forEach((card) =>{
    artistList.appendChild(card);
  });
}
 
async function addArtist(event) {
  event.preventDefault();

  const formData = new FormData(addArtistForm);
  const newArtist = {
    name:formData.get("name"),
    imageUrl :formData.get("imageUrl"),
    description: formData.get("description"),
    };

    try{
      const response = await fetch(API_URL, {
        method:"POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(newArtist),
      });

      if (!response.ok){
        throw new Error('Failed to add artist');
      }
    
    addArtistForm.reset();

    await getArtists();
    renderArtists();
  } catch (error) {
    console.error(error);
  }
}
