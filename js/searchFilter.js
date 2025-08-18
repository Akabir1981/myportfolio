// searchFilter.js

// Worker API URL অনুযায়ী search
export async function searchArticles(API_URL, keyword) {
  try {
    const res = await fetch(API_URL);
    const articles = await res.json();

    // keyword filter
    const results = articles.filter(a =>
      a.title.toLowerCase().includes(keyword.toLowerCase())
    );

    return results;
  } catch (err) {
    console.error("Search failed:", err);
    return [];
  }
}

// DOM-এ search results render
export function renderSearchResults(results) {
  const articleList = document.getElementById("articleList");
  articleList.innerHTML = "";

  results.forEach(article => {
    const div = document.createElement("div");
    div.className = "article article-item";

    const heading = document.createElement("h3");
    heading.className = "article-heading";
    heading.textContent = article.title;

    const content = document.createElement("p");
    content.textContent = article.content;

    div.appendChild(heading);
    div.appendChild(content);
    articleList.appendChild(div);
  });
}

// search input attach
export function attachSearchInput(API_URL) {
  const searchInput = document.getElementById("searchInput");

  searchInput.addEventListener("input", async () => {
    const keyword = searchInput.value.trim();
    const results = await searchArticles(API_URL, keyword);
    renderSearchResults(results);
  });
}
