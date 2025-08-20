import { collection, addDoc, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

export function initArticlesManage(db) {
  const list = document.getElementById("articleList");
  const form = document.getElementById("articleForm");
  const articlesCol = collection(db, "articles");

  // Initialize Quill editor
  const quill = new Quill('#editor', {
    theme: 'snow'
  });

  // Live update
  onSnapshot(articlesCol, query(collection(db, "articles")), snapshot => {
    list.innerHTML = "";
    snapshot.forEach(docSnap => {
      const data = docSnap.data();
      list.innerHTML += `
        <div class="article article-item">
          <h3 class="article-heading">${data.title}</h3>
          <div class="article-content">${data.content}</div>
        </div>
      `;
    });
  });

  // Add article
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const title = form.title.value.trim();
    const content = quill.root.innerHTML; // rich text HTML

    if (!title || !content) return;

    await addDoc(articlesCol, { title, content, createdAt: new Date() });
    form.reset();
    quill.setContents([]); // clear editor
  });
}
