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


