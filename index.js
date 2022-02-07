const holder = document.querySelector("#holder"); // holds the value of the input text;
const btn = document.querySelector(".btn");
const result_area = document.querySelector(".display-result"); // result to be displayed here;
const getLyrics = document.querySelectorAll(".getLyrics"); // genrated btn to get the lyrics of the song;
const song_div = document.querySelector(".parent-song");

let api_url = "https://api.lyrics.ovh/suggest/"; // for name of songs and title ;
let lyrics_api_url = "https://api.lyrics.ovh/v1/"; // for lyrics of the songs entered ;
let song;

const urlify = function (text) {
  return text.replaceAll(" ", "%20");
};

btn.addEventListener("click", (e) => {
  e.preventDefault();
  const text = urlify(holder.value);
  search_url = api_url + text;
  fetch_data(search_url, display_song);
});

const fetch_data = function (search_url, diplay_fn) {
  fetch(search_url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      diplay_fn(data);
    })
    .catch(() => {
      console.log("Cant get the data");
    });
};

const display_song = function (data) {
  result_area.innerHTML = "";
  data.data.forEach((song, i) => {
    const html = `<div class="parent-song">
            <span class="song"><b>${song.artist.name}</b>-${song.title}</span>
            <button class="getLyrics" data-key = "${i}" >Get Lyrics</button>
    </div>`;

    result_area.innerHTML += html;
  });
};

const display_lyrics = function (data, title) {
  const html = `<div class="fetched-song">
        <div class="heading-song"><b>${song.split("-")[0]}</b> - ${
    song.split("-")[1]
  }</div>
        <pre class= "got-song">${data.lyrics}</pre>
    </div>`;
  if (data.lyrics) {
    result_area.innerHTML = "";
    result_area.innerHTML = html;
  }
};

result_area.addEventListener("click", (e) => {
  const parent = e.target.parentElement.children;
  song = parent[0].innerText;

  fetch_lyrics(song);
});

// Till I Collapse-Not Afraid (Piano Version)
const fetch_lyrics = function (song) {
  const value = song.toLowerCase().split("-");

  const singer = urlify(value[0]);
  const title = urlify(value[1]);

  const new_url = `${lyrics_api_url}${singer}/${title}`;
  fetch_data(new_url, display_lyrics);
};
