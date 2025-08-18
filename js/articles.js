// articles.js
export async function initArticlesView(API_URL) {
  const list = document.getElementById("articleList");

  try {
    const res = await fetch(API_URL + "/articles");
    const articles = await res.json();

    list.innerHTML = "";
    articles.forEach(article => {
      const div = document.createElement("div");
      div.className = "article article-item";

      const heading = document.createElement("h3");
      heading.className = "article-heading";
      heading.textContent = article.title;

      const content = document.createElement("p");
      content.textContent = article.content;

      div.appendChild(heading);
      div.appendChild(content);
      list.appendChild(div);
    });
  } catch (err) {
    console.error("Error fetching articles:", err);
  }
}
