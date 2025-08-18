// searchFilter.js
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// Firestore থেকে search keyword অনুযায়ী articles fetch
export async function searchArticles(db, keyword) {
  const articlesRef = collection(db, "articles");
  const snapshot = await getDocs(articlesRef);
  const results = [];

  snapshot.forEach(doc => {
    const data = doc.data();
    // Title match check (case-insensitive)
    if (data.title.toLowerCase().includes(keyword.toLowerCase())) {
      results.push({ id: doc.id, ...data });
    }
  });

  return results;
}

// DOM-এ articles render করা
export function renderSearchResults(results) {
  const articleList = document.getElementById("articleList");
  articleList.innerHTML = "";

  results.forEach(article => {
    const div = document.createElement("div");
    div.className = "article-item";

    const heading = document.createElement("h2");
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
export function attachSearchInput(db) {
  const searchInput = document.getElementById("searchInput");

  searchInput.addEventListener("input", async () => {
    const keyword = searchInput.value.trim();
    const results = await searchArticles(db, keyword);
    renderSearchResults(results);
  });
}

// DOMContentLoaded এ attach করা
document.addEventListener("DOMContentLoaded", () => {
  // যদি আপনার initArticlesView(db) আগে চলে থাকে, তাহলে attach করতে হবে db parameter
  if (window.db) attachSearchInput(window.db);
});
