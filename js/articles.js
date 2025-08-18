// Read-only view
export async function initArticlesView(API_URL) {
  const list = document.getElementById("articleList");

  try {
    const res = await fetch(API_URL);
    const articles = await res.json();

    list.innerHTML = "";
    articles.forEach(a => {
      const div = document.createElement("div");
      div.className = "article article-item";
      div.innerHTML = `
        <h3 class="article-heading">${a.title}</h3>
        <p>${a.content}</p>
      `;
      list.appendChild(div);
    });
  } catch (err) {
    console.error("Failed to load articles:", err);
    list.innerHTML = "<p>Error loading articles.</p>";
  }
}

// Manage (Add) page
export function initArticlesManage(API_URL) {
  const list = document.getElementById("articleList");
  const form = document.getElementById("articleForm");

  async function loadArticles() {
    try {
      const res = await fetch(API_URL);
      const articles = await res.json();
      list.innerHTML = "";
      articles.forEach(a => {
        const div = document.createElement("div");
        div.className = "article article-item";
        div.innerHTML = `
          <h3 class="article-heading">${a.title}</h3>
          <p>${a.content}</p>
        `;
        list.appendChild(div);
      });
    } catch (err) {
      console.error(err);
    }
  }

  loadArticles();

  // Add article
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const title = form.title.value.trim();
    const content = form.content.value.trim();
    if (!title || !content) return;

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content })
      });
      form.reset();
      loadArticles(); // Refresh list
    } catch (err) {
      console.error("Failed to add article:", err);
    }
  });
}
