/* eslint-disable no-unused-vars */

const form = document.querySelector('form');
const bookInfo = document.querySelector('.all-books');
const title = document.querySelector('#input-title');
const author = document.querySelector('#input-author');
const dateEl = document.querySelector('.date');
const listBtn = document.querySelector('.list-button');
const addBtn = document.querySelector('.add-button');
const contactBtn = document.querySelector('.contact-button');
const bookSection = document.querySelector('.books-list');
const addBookSection = document.querySelector('.add-book-form');
const contactSection = document.querySelector('.contact-info');

let bookArr = [];

class Book {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }

  static bookDisplay() {
    bookInfo.innerHTML = '';
    for (let i = 0; i < bookArr.length; i += 1) {
      const oneBook = document.createElement('div');
      oneBook.className = 'book';
      oneBook.innerHTML = `
        <p class="title">"${bookArr[i].title}" by ${bookArr[i].author}</p>
        <button class="remove" onclick="Book.removeBook(${i})">Remove</button>
      `;
      bookInfo.appendChild(oneBook);
      title.value = '';
      author.value = '';
    }
  }

  static addBook() {
    const eachBook = {};
    eachBook.id = bookArr.length;
    eachBook.title = title.value;
    eachBook.author = author.value;

    bookArr.push(eachBook);
    Book.bookDisplay();

    const jsonData = JSON.stringify(bookArr);
    localStorage.setItem('form', jsonData);
  }

  static removeBook(index) {
    bookArr.splice(index, 1);
    Book.bookDisplay();
    const jsonData = JSON.stringify(bookArr);
    localStorage.setItem('form', jsonData);
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  Book.addBook();
});
window.addEventListener('load', () => {
  const getJsonData = localStorage.getItem('form');
  if (getJsonData) {
    bookArr = JSON.parse(getJsonData);
  }
  Book.bookDisplay();
});

// SPA Navigation
const date = new Date();
dateEl.innerHTML = date;

listBtn.addEventListener('click', () => {
  bookSection.classList.add('active');
  bookSection.classList.remove('hiiden');
  addBookSection.classList.add('hidden');
  addBookSection.classList.remove('active');
  contactSection.classList.add('hidden');
  contactSection.classList.remove('active');
});

addBtn.addEventListener('click', () => {
  bookSection.classList.remove('active');
  bookSection.classList.add('hidden');
  addBookSection.classList.add('active');
  addBookSection.classList.remove('hidden');
  contactSection.classList.add('hidden');
  contactSection.classList.remove('active');
});
