// Events that occur when the page loads
let booksVisible = false; // Initialize booksVisible variable
let archiveVisible = false; // Initialize archiveVisible variable
accessBooks();

// Function that allows user to access all book titles and their authors in a list
function accessBooks() {
  const showBooksButton = document.querySelector("#showBooks");
  const booklist = document.querySelector("#booklist");
  const bookDetailsCard = document.querySelector("#bookDetailsCard");
  const archivedBooks = document.querySelector("#readBooks");

  showBooksButton.addEventListener("click", () => {
    // Add a toggle mechanism to the button
    // Check if books are not visible
    if (!booksVisible) {
      //   bookDetailsCard.applyStyle.display = "none";
      fetch("http://localhost:3000/books")
        .then((response) => response.json())
        .then((books) => {
          booklist.innerHTML = "";
          books.forEach((book) => {
            const li = document.createElement("li");
            li.textContent = `${book.title}`;

            // Add an archive button
            const archiveBtn = document.createElement("button");
            archiveBtn.classList.add('btn', 'btn-archive'); // Add custom classes for styling
            archiveBtn.innerHTML = '<i class="fa-solid fa-box-archive fa-beat"></i>'; // Use Font Awesome bookmark icon
            archiveBtn.addEventListener("click", () => archivedBooks(book.id));
            li.appendChild(archiveBtn);

            // Add an event listener to the li
            li.addEventListener("click", () => showBookDetails(book.id));
            booklist.appendChild(li);
          });
          booksVisible = true; // Update booksVisible to true after showing the list
        })
        .catch((error) => console.error("Error: " + error));
    } else {
      // If books are already visible, clear the list
      booklist.innerHTML = "";
      booksVisible = false; // Update booksVisible to false
    }
  });
}

// Function to show book details
function showBookDetails(id) {
  // Fetch book details and display them
  fetch(`http://localhost:3000/books/${id}`)
    .then((response) => response.json())
    .then((book) => {
      bookDetailsCard.innerHTML = "";
      bookDetailsCard.innerHTML = `<h2>${book.title}</h2>
        <p>Authors: ${book.authors}</p>
        <p>Edition: ${book.edition}</p>
        <p>Publication Date: ${book.publication_date}</p>
        <p>Purchase Date: ${book.purchase_date}</p>
        <p>Location: ${book.location}</p>
        <p>Genre: ${book.genre}</p>
        <p>Notes: ${book.notes}</p>`;
    })
    .catch((error) => console.error("Error: " + error));
}

accessArchive();
// Function that allows the user to access the archive
function accessArchive() {
  const showArchiveBtn = document.querySelector("#readBooks");
  const archivelist = document.querySelector("#archivelist");
  const archiveDetailsCard = document.querySelector("#archiveDetailsCard");

  showArchiveBtn.addEventListener("click", () => {
    // Add a toggle mechanism to the button
    if (!archiveVisible) {
      fetch("http://localhost:3000/archive")
        .then((response) => response.json())
        .then((archive) => {
          archivelist.innerHTML = "";
          archive.forEach((book) => {
            const li = document.createElement("li");
            li.textContent = `${book.title}`;

            // Add a delete button
            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("btn", "btn-danger"); // Add custom classes for styling
            deleteBtn.innerHTML = '<i class="fa-solid fa-trash fa-fade"></i>';
            deleteBtn.addEventListener("click", () => deleteBook(book.id));
            li.appendChild(deleteBtn);
            // Add an event listener to each delete button
            deleteBtn.addEventListener("click", (event) => {
              const bookId = event.target.dataset.bookId;
              deleteBook(bookId);
            });
            // Add an event listener to the li
            li.addEventListener("click", () => showArchiveDetails(book.id));
            archivelist.appendChild(li);
          });
          archiveVisible = true; // Update archiveVisible to true after showing the list
        })
        .catch((error) => console.error("Error: " + error));
    } else {
      // If archive is already visible, clear the list
      archivelist.innerHTML = "";
      archiveVisible = false; // Update archiveVisible to false
    }
  });
}
function deleteBook(bookId) {
  fetch(`http://localhost:3000/archive/${bookId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        // If the deletion is successful, remove the corresponding list item from the DOM
        const listItemToRemove = document.querySelector(
          `li[data-book-id="${bookId}"]`
        );
        if (listItemToRemove) {
          listItemToRemove.remove();
        }
      } else {
        throw new Error("Error deleting book");
      }
    })
    .catch((error) => console.error("Error: " + error));
}
// Function to show archive details
function showArchiveDetails(id) {
  // Fetch archive details and display them
  fetch(`http://localhost:3000/archive/${id}`)
    .then((response) => response.json())
    .then((book) => {
      archiveDetailsCard.innerHTML = "";
      archiveDetailsCard.innerHTML = `<h2>${book.title}</h2>
     <p>Authors: ${book.authors}</p>
     <p>Edition: ${book.edition}</p>
     <p>Publication Date: ${book.publication_date}</p>
     <p>Purchase Date: ${book.purchase_date}</p>
     <p>Location: ${book.location}</p>
     <p>Genre: ${book.genre}</p>
     <p>Notes: ${book.notes}</p>`;
    })
    .catch((error) => console.error("Error: " + error));
}
