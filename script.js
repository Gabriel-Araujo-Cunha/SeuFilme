const sliders = document.querySelector(".filme__container");
let scrollAmount = 0;
let scrollPerClick = 220;
const imagePadding = 20;


function sliderScrollLeft() {
  scrollAmount = Math.max(0, scrollAmount - scrollPerClick);
  sliders.scrollTo({
    top: 0,
    left: scrollAmount,
    behavior: "smooth",
  });
}

function sliderScrollRight() {
  const maxScrollLeft = sliders.scrollWidth - sliders.clientWidth;
  if (scrollAmount < maxScrollLeft) {
    scrollAmount = Math.min(maxScrollLeft, scrollAmount + scrollPerClick);
    sliders.scrollTo({
      top: 0,
      left: scrollAmount,
      behavior: "smooth",
    });
  }
}

async function showMovies() {
    const apiKey = "53e210b0b414b4c6517fc83eccceff82";

    try {
        const response = await axios.get (
            `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc`
        );

        const movies = response.data.results;

        movies.forEach ((movie, index) => {
            sliders.insertAdjacentHTML(
                "beforeend",
                        `<img class="img-${index} slider-img" src="https://image.tmdb.org/t/p/w300/${movie.poster_path}"/>`

            );
        });

        const firstImage = document.querySelector("img-0");
        if (firstImage) {
            scrollPerClick = firstImage + imagePadding + 20;
        }
    }catch (error) {
        console.log("Erro ao buscar filmes" , error);
    }
}

showMovies()