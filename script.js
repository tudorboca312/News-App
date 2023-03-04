// Elements
const btnGeneral = document.querySelector(`#general`);
const btnBusiness = document.querySelector(`#business`);
const btnSport = document.querySelector(`#sports`);
const btnTechnology = document.querySelector(`#technology`);
const btnEntertainment = document.querySelector(`#entertainment`);
const btnSearch = document.querySelector(`#btnSearch`);
const row = document.querySelector(`.row`);
pageHeadline = document.createElement(`div`);
pageHeadline.className = (`col-12`, `headline`);

// search topic
let topic = document.querySelector(`#input`);

// apis
const API_KEY = "ed48df921aef42a3b8d402bcc684fa10";

const SEARCH_LINK = "https://newsapi.org/v2/everything?q=";
const GENERAL_LINK = `https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=${API_KEY}`;
const BUSINESS_LINK = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${API_KEY}`;
const SPORTS_LINK = `https://newsapi.org/v2/top-headlines?country=us&category=sport&apiKey=${API_KEY}`;
const TECHNOLOGY_LINK = `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${API_KEY}`;
const ENTERTAINMENT_LINK = `https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=${API_KEY}`;

let newsArticles = [];

// Opening browser
window.onload = function () {
  fetchGeneralNews();
  pageHeadline.textContent = `General News`;
};

// Event
btnSearch.addEventListener("click", function (e) {
  e.preventDefault();
  fetchSearchNews();
  pageHeadline.textContent = topic.value + ` news`;
  console.log(topic.value);
});
btnGeneral.addEventListener(`click`, function () {
  fetchGeneralNews();
  pageHeadline.textContent = `General News`;
});

btnBusiness.addEventListener(`click`, function () {
  fetchBusinessNews();
  pageHeadline.textContent = `Business News`;
});
btnSport.addEventListener(`click`, function () {
  fetchSportsNews();
  pageHeadline.textContent = `Sports News`;
});
btnTechnology.addEventListener(`click`, function () {
  fetchTechnologyNews();
  pageHeadline.textContent = `Technology News`;
});
btnEntertainment.addEventListener(`click`, function () {
  fetchEntertainmentNews();
  pageHeadline.textContent = `Etnertainment News`;
});

const fetchSearchNews = async () => {
  if (topic == null) {
    return;
  }
  const answer = await fetch(
    SEARCH_LINK + encodeURIComponent(topic.value) + "&apiKey=" + API_KEY
  );
  newsArticles = [];
  if (answer.status >= 200 && answer.status <= 300) {
    const data = await answer.json();
    newsArticles = data.articles;
  } else {
    console.log(answer.status, answer.statusText);
    pageHeadline.textContent = `No information found.`;
    return;
  }
  displayNews();
};

const fetchGeneralNews = async () => {
  const answer = await fetch(GENERAL_LINK);
  newsArticles = [];
  if (answer.status >= 200 && answer.status <= 300) {
    const data = await answer.json();
    newsArticles = data.articles;
  } else {
    console.log(answer.status, answer.statusText);
    pageHeadline.textContent = `No information found.`;
    return;
  }

  displayNews();
};
const fetchBusinessNews = async () => {
  const answer = await fetch(BUSINESS_LINK);
  newsArticles = [];
  if (answer.status >= 200 && answer.status <= 300) {
    const data = await answer.json();
    newsArticles = data.articles;
  } else {
    console.log(answer.status, answer.statusText);
    pageHeadline.textContent = `No information found.`;
    return;
  }

  displayNews();
};
const fetchSportsNews = async () => {
  const answer = await fetch(SPORTS_LINK);
  newsArticles = [];
  if (answer.status >= 200 && answer.status <= 300) {
    const data = await answer.json();
    newsArticles = data.articles;
  } else {
    console.log(answer.status, answer.statusText);
    pageHeadline.textContent = `No information found.`;
    return;
  }

  displayNews();
};
const fetchTechnologyNews = async () => {
  const answer = await fetch(TECHNOLOGY_LINK);
  newsArticles = [];
  if (answer.status >= 200 && answer.status <= 300) {
    const data = await answer.json();
    newsArticles = data.articles;
  } else {
    console.log(answer.status, answer.statusText);
    pageHeadline.textContent = `No information found.`;
    return;
  }

  displayNews();
};
const fetchEntertainmentNews = async () => {
  const answer = await fetch(ENTERTAINMENT_LINK);
  newsArticles = [];
  if (answer.status >= 200 && answer.status <= 300) {
    const data = await answer.json();
    newsArticles = data.articles;
  } else {
    console.log(answer.status, answer.statusText);
    pageHeadline.textContent = `No information found.`;
    return;
  }

  displayNews();
};

function displayNews() {
  row.innerHTML = "";
  row.appendChild(pageHeadline);

  newsArticles.forEach((article) => {
    // console.log(article);
    let col = document.createElement(`div`);
    let card = document.createElement(`div`);
    let cardBody = document.createElement(`div`);
    let date = document.createElement(`h6`);
    let title = document.createElement(`h2`);
    let shortTitle = document.createElement(`h2`);
    let text = document.createElement(`p`);
    let shortText = document.createElement(`p`);
    let img = document.createElement(`img`);
    let a = document.createElement(`a`);

    col.className = `col-lg-3 col-md-4 col-sm-6 col-12`;
    card.className = `card`;
    cardBody.className = `card-body`;
    date.className = `card-subtitle text-primary`;
    shortTitle.className = `card-title`;
    shortText.className = `card-text`;
    img.className = `card-img-top`;
    a.className = `btn btn-primary btn-dark `;
    a.setAttribute(`href`, article.url);
    a.setAttribute(`target`, `_blank`);

    // Put the input here
    date.textContent = article.publishedAt.split("T")[0];
    title = article.title;
    shortTitle.textContent = title.split(" ").slice(0, 10).join(" ");
    text = article.description;
    if (text == null) {
      shortText.textContent = text;
    } else {
      shortText.textContent = text.split(" ").slice(0, 25).join(" ") + ` ...`;
    }
    a.textContent = `View full article`;
    if (article.urlToImage == null) {
      img.src = `notAvailable.png`;
    } else {
      img.src = article.urlToImage;
    }
    // append here
    row.appendChild(col);
    col.appendChild(card);
    card.appendChild(cardBody);
    cardBody.appendChild(img);
    cardBody.appendChild(date);
    cardBody.appendChild(shortTitle);
    cardBody.appendChild(shortText);
    cardBody.appendChild(a);
  });
}
