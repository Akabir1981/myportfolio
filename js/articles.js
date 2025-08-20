import { collection, addDoc, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// Read-only view (sorted by createdAt descending)
export function initArticlesView(db) {
  const list = document.getElementById("articleList");
  const articlesCol = collection(db, "articles");

  // Query with orderBy createdAt descending
  const articlesQuery = query(articlesCol, orderBy("createdAt", "desc"));

  onSnapshot(articlesQuery, snapshot => {
    list.innerHTML = "";
    snapshot.forEach(docSnap => {
      const data = docSnap.data();
      list.innerHTML += `
        <div class="article article-item">
          <h3 class="article-heading">${data.title}</h3>
          <p>${data.content}</p>
           <p class="article-content">${data.content}</p>
        </div>
      `;
    });
  });
}

// Manage (Add) page
export function initArticlesManage(db) {
  const list = document.getElementById("articleList");
  const form = document.getElementById("articleForm");
  const articlesCol = collection(db, "articles");

  // Live update
  onSnapshot(articlesCol, snapshot => {
    list.innerHTML = "";
    snapshot.forEach(docSnap => {
      const data = docSnap.data();
      list.innerHTML += `
        <div class="article article-item">
          <h3 class="article-heading">${data.title}</h3>
          <p>${data.content}</p>
        </div>
      `;
    });
  });

  // Add article
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const title = form.title.value.trim();
    const content = form.content.value.trim();
    if (!title || !content) return;

    await addDoc(articlesCol, { title, content, createdAt: new Date() });
    form.reset();
  });
}

