import BookService from "./services/BookService";
const bookService = new BookService();

import { format } from "timeago.js";

class UI {
  async renderBooks() {
    const books = await bookService.getBook();
    const bookCardsContainer = document.getElementById("books-card");
    bookCardsContainer.innerHTML = "";
    books.forEach((book) => {
      const div = document.createElement("div");
      div.className = "";
      div.innerHTML = `
            <div class="card card-body mb-4">
                <div class="row">
                    <div class="col-4">
                        <img src="http://localhost:3000/${
                          book.imagePath
                        }" alt="" class="img-fluid"/>
                    </div>
                    <div class="col-8">
                        <div class="card-block px-2">
                            <h4 class="card-title">${book.title}</h4>
                            <p class="card-text">${book.author}</p>
                            <a href="#" class="btn btn-danger delete" _id="${
                              book._id
                            }">X</a>
                        </div>
                    </div>
                </div>            
                <div className="card-footer">
                    ${format(book.created_at)}
                </div>
            </div>
        `;
      bookCardsContainer.appendChild(div);
    });
  }

  async addNewBook(book) {
    await bookService.postBook(book);
    this.clearBookFoorm();
    this.renderBooks();
  }

  clearBookFoorm() {
    document.getElementById("book-form").reset();
  }

  renderMessage(message, colorMessage, secondsToRemove) {
    const div = document.createElement("div");
    div.className = `alert alert-${colorMessage} message`;
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector(".py-4 div");
    const bookForm = document.querySelector("#book-form");

    container.insertBefore(div, bookForm);
    setTimeout(() => {
      document.querySelector(".message").remove();
    }, secondsToRemove);
  }

  async deleteBook(bookId) {
    await bookService.deleteBook(bookId);
    this.renderBooks();
  }
}

export default UI;
