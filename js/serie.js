const seriesSlider = document.querySelector(".serie__container");
let scrollSeriesAmount = 0;
let scrollSeriesPerClick = 220;
const seriesImagePadding = 20;

function sliderSeriesScrollLeft() {
  scrollSeriesAmount = Math.max(0, scrollSeriesAmount - scrollSeriesPerClick);
  seriesSlider.scrollTo({
    top: 0,
    left: scrollSeriesAmount,
    behavior: "smooth",
  });
}

function sliderSeriesScrollRight() {
  const maxScrollLeft = seriesSlider.scrollWidth - seriesSlider.clientWidth;
  if (scrollSeriesAmount < maxScrollLeft) {
    scrollSeriesAmount = Math.min(maxScrollLeft, scrollSeriesAmount + scrollSeriesPerClick);
    seriesSlider.scrollTo({
      top: 0,
      left: scrollSeriesAmount,
      behavior: "smooth",
    });
  }
}

async function showSeries() {
  const apiKey = "53e210b0b414b4c6517fc83eccceff82";

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&sort_by=popularity.desc`
    );

    const series = response.data.results;

    series.forEach((serie, index) => {
      seriesSlider.insertAdjacentHTML(
        "beforeend",
        `<img class="serie-img-${index} slider-img" src="https://image.tmdb.org/t/p/w300/${serie.poster_path}" alt="${serie.name}"/>`
      );
    });

    const firstSeriesImage = document.querySelector(".serie-img-0");
    if (firstSeriesImage) {
      scrollSeriesPerClick = firstSeriesImage.clientWidth + seriesImagePadding + 20;
    }
  } catch (error) {
    console.log("Erro ao buscar séries", error);
  }
}

showSeries();
