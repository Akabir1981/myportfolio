import { collection, addDoc, onSnapshot, doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

export function initArticlesAdmin(db) {
  const list = document.getElementById("articleList");
  const form = document.getElementById("articleForm");
  const articlesCol = collection(db, "articles"); // <-- Firestore DB reference
  let editingDocId = null;

  // Live update articles
  onSnapshot(articlesCol, snapshot => {
    list.innerHTML = "";
    snapshot.forEach(docSnap => {
      const data = docSnap.data();
      const id = docSnap.id;
      list.innerHTML += `
        <div class="article">
          <h3>${data.title}</h3>
          <p>${data.content}</p>
          <button class="edit-btn" data-id="${id}">Edit</button>
          <button class="delete-btn" data-id="${id}">Delete</button>
        </div>
      `;
    });

    // Edit buttons
    list.querySelectorAll(".edit-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const docData = snapshot.docs.find(d => d.id === id).data();
        form.title.value = docData.title;
        form.content.value = docData.content;
        editingDocId = id;
      });
    });

    // Delete buttons
    list.querySelectorAll(".delete-btn").forEach(btn => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-id");
        if (confirm("Are you sure to delete this article?")) {
          await deleteDoc(doc(db, "articles", id));
        }
      });
    });
  });

  // Add or update article
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const title = form.title.value.trim();
    const content = form.content.value.trim();
    if (!title || !content) return;

    if (editingDocId) {
      // Update existing
      await updateDoc(doc(db, "articles", editingDocId), { title, content });
      editingDocId = null;
    } else {
      // Add new
      await addDoc(articlesCol, { title, content, createdAt: new Date() });
    }

    form.reset();
  });
}
