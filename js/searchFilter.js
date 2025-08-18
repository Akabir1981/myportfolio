// searchFilter.js
export async function searchArticles(API_URL, keyword) {
  try {
    const res = await fetch(API_URL + "/articles");
    const articles = await res.json();

    // Filter locally
    return articles.filter(a =>
      a.title.toLowerCase().includes(keyword.toLowerCase())
    );
  } catch (err) {
    console.error("Error searching articles:", err);
    return [];
  }
}

export function renderSearchResults(results) {
  const articleList = document.getElementById("articleList");
  articleList.innerHTML = "";

  results.forEach(article => {
    const div = document.createElement("div");
    div.className = "article-item";

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

export function attachSearchInput(API_URL) {
  const searchInput = document.getElementById("searchInput");

  searchInput.addEventListener("input", async () => {
    const keyword = searchInput.value.trim();
    const results = await searchArticles(API_URL, keyword);
    renderSearchResults(results);
  });
}
