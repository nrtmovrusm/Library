const myLibrary = [];

function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
    this.info = function() {
        return (this.title + " by " + this.author + ", " + this.pages + " pages, " + this.readStatus);
    };
}

Book.prototype.toggleReadStatus = function() {
    if (this.readStatus === "read") {
        this.readStatus = "not read yet";
    } else {
        this.readStatus = "read";
    }
}

function addBookToLibrary(title, author, pages, readStatus) {
    let newBook = new Book(title, author, pages, readStatus);
    myLibrary.push(newBook);
    return newBook;
}

// const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, "not read yet");

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, "not read yet");
addBookToLibrary("A Song of Ice and Fire", "George R.R. Martin", 704, "not read yet");
addBookToLibrary("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", 345, "read")

const libraryContainer = document.querySelector(".library-container");

function displayLibrary() {
    // clear libraryContainer of previous books prior to updating libraryContainer with most updated myLibrary array
    while (libraryContainer.firstChild) {
        libraryContainer.replaceChildren();
    }

    for (const [index, item] of myLibrary.entries()) {
        const libraryBook = document.createElement("div");
        libraryBook.classList.add("library-book");
        libraryBook.textContent = item.info();

        // create Remove Book buttons
        const removeBookBtn = document.createElement("button");
        removeBookBtn.textContent = `Remove Book`;
        removeBookBtn.classList.add("remove-book-btn");
        removeBookBtn.id = `${index}`;
        libraryBook.appendChild(removeBookBtn);

        removeBookBtn.addEventListener("click", (e) => {
            myLibrary.splice(Number(e.target.id), 1);
            displayLibrary();
        })

        // create Read Status toggle button
        const readStatusBtn = document.createElement("button");
        readStatusBtn.textContent = `Read Status: ${item.readStatus}`;
        readStatusBtn.classList.add("read-status-button");
        readStatusBtn.id=`${index}`;
        libraryBook.appendChild(readStatusBtn);

        readStatusBtn.addEventListener("click", (e) => {
            const editedBookReadStatus = myLibrary[Number(e.target.id)]
            editedBookReadStatus.toggleReadStatus();
            displayLibrary();
        })

        libraryContainer.appendChild(libraryBook);
    }
}

const addBtn = document.querySelector("#addBtn");
const addBookDialog = document.querySelector("#addBookDialog");
const output = document.querySelector("output");
const confirmBtn = document.querySelector("#confirmBtn");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const readStatus = document.querySelector("#readStatus");
const form = document.querySelector("form");

// addBtn opens up the <dialog> with form
addBtn.addEventListener("click", () => {
    addBookDialog.showModal();
});

// Cancel button closes dialog without submitting because of formmethod=dialog, triggering closing event
// Checks for default since this is the value of confirmBtn PRIOR to form being filled out 
addBookDialog.addEventListener("close", () => {
    output.value = 
        addBookDialog.returnValue === "default" ? "No book added." : `Book added: ${addBookDialog.returnValue}`;
});

// Prevent confirm button from default behavior of submitting form
// Close dialog with close() method which triggers the close event 

confirmBtn.addEventListener("click", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
        event.preventDefault();
        alert("Please fill out all of the required elements to add a new book to the library.");
    } else {
        let addedBook = addBookToLibrary(title.value, author.value, pages.value, readStatus.value);
        title.value = "";
        author.value = "";
        pages.value = "";
        readStatus.value = "";
        displayLibrary();
        addBookDialog.close(addedBook.info());
    }
});

displayLibrary()