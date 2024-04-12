// Global Variables declared
let booksVisible = false;
let archiveVisible = false;
accessBooks();

// Function that allows user to access all book titles in the list
function accessBooks() {
  const showBooksButton = document.querySelector("#showBooks");
  const booklist = document.querySelector("#booklist");

  // Card that displays the book's details
  const bookDetailsCard = document.querySelector("#bookDetailsCard");

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

            // Add an archive button which handles the achievedBooks function
            const archiveBtn = document.createElement("button");
            // Add a class list for easy styling in CSS
            archiveBtn.classList.add("btn", "btn-archive");
            // Use an icon as a button instead of text-content
            archiveBtn.innerHTML =
              '<i class="fa-solid fa-box-archive fa-beat"></i>';
            archiveBtn.addEventListener("click", () => archivedBooks(book.id));
            li.appendChild(archiveBtn);

            // Add an event listener to the li element created
            li.addEventListener("click", () => showBookDetails(book.id));
            booklist.appendChild(li);
          });
          // Update booksVisible to true after showing the list
          booksVisible = true;
        })
        .catch((error) => console.error("Error: " + error));
    } else {
      // If books are already visible, clear the list
      booklist.innerHTML = "";
      // Update booksVisible to false
      booksVisible = false;
    }
  });
}

// Function to show book details on the card
function showBookDetails(id) {
  fetch(`http://localhost:3000/books/${id}`)
    .then((response) => response.json())
    .then((book) => {
      bookDetailsCard.innerHTML = "";
      bookDetailsCard.innerHTML =
        // Display the book details by using the key values of the book object as in the db.json file
        `<h2>${book.title}</h2>
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

// Function that allows the user to access the archive
accessArchive();
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

            // Add a delete button for each book listed
            const deleteBtn = document.createElement("button");
            // Add a class list for easy styling in CSS
            deleteBtn.classList.add("btn", "btn-danger");
            // Use an icon as a button
            deleteBtn.innerHTML = '<i class="fa-solid fa-trash fa-fade"></i>';
            // Add an event listener to the delete button
            deleteBtn.addEventListener("click", () => deleteBook(book.id));
            li.appendChild(deleteBtn);
            // Add an event listener to each delete button
            deleteBtn.addEventListener("click", (event) => {
              const bookId = event.target.dataset.bookId;
              deleteBook(bookId);
            });
            // Add an event listener to the li element
            li.addEventListener("click", () => showArchiveDetails(book.id));
            archivelist.appendChild(li);
          });
          // Update archiveVisible to true after showing the list
          archiveVisible = true;
        })
        .catch((error) => console.error("Error: " + error));
    } else {
      // If archive is already visible, clear the list
      archivelist.innerHTML = "";
      // Update archiveVisible to false
      archiveVisible = false;
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
        // If the deletion is successful, remove the corresponding list item
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
// Function to show archive details on the card
function showArchiveDetails(id) {
  fetch(`http://localhost:3000/archive/${id}`)
    .then((response) => response.json())
    .then((book) => {
      archiveDetailsCard.innerHTML = "";
      archiveDetailsCard.innerHTML =
        // Display the book details by using the key values of the book object as in the db.json file
        `<h2>${book.title}</h2>
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
// Function that adds more books to the Current Reading list using the form
function formSubmission(event) {
  // Prevent the page from refreshing when the user clicks the button
  event.preventDefault();
  // Create a unique id for each book for identification purposes
  const id = new Date().getTime();
  const title = document.getElementById("title").value;
  const authors = document.getElementById("authors").value;
  const edition = document.getElementById("edition").value;
  const publication_date = document.getElementById("publication_date").value;
  const purchase_date = document.getElementById("purchase_date").value;
  const location = document.getElementById("location").value;
  const genre = document.getElementById("genre").value;

  fetch("http://localhost:3000/books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // Book Details using properties
      id: id,
      title: title,
      authors: authors,
      edition: edition,
      publication_date: publication_date,
      purchase_date: purchase_date,
      location: location,
      genre: genre,
    }),
  })
    .then((response) => response.json())
    .then((books) => {
      console.log("Book added:" + books.length);
    })
    .catch((error) => console.error("Error: " + error));
}
// Add an event listener to the button
document.querySelector("#addbks").addEventListener("submit", formSubmission);

// function bookArchiving(event) {
//   event.preventDefault();

//   const title = document.getElementById("title").value;
//   const authors = document.getElementById("authors").value;
//   const edition = document.getElementById("edition").value;
//   const publication_date = document.getElementById("publication_date").value;
//   const purchase_date = document.getElementById("purchase_date").value;
//   const location = document.getElementById("location").value;
//   const genre = document.getElementById("genre").value;

//   fetch("http://localhost:3000/archive", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       // Book Details using properties
//       title: title,
//       authors: authors,
//       edition: edition,
//       publication_date: publication_date,
//       purchase_date: purchase_date,
//       location: location,
//       genre: genre,
//     }),
//   })
//    .then((response) => response.json())
//    .then((books) => {
//       console.log("Book added:" + books.length);
//     })
//     .catch((error) => console.error("Error: " + error));
// }
// // Add an event listener to the button
// document.querySelector(".btn-archive").addEventListener("click", bookArchiving);