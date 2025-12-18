import ApiClient from '../api/client.js';
import { filterBooks } from '../utils/filter.js';
import { sortBooks } from '../utils/sort.js';
import { paginate } from '../utils/pagination.js';
import Pagination from '../components/pagination.js';
import Breadcrumbs from '../components/breadcrumbs.js';

export default async function initCatalog() {
  console.log('Catalog page initialized');

  const state = {
    books: [],
    subjects: [],
    filters: {
      search: '',
      subjectId: '',
      availableOnly: false,
    },
    sortBy: 'title',
    currentPage: 1,
    itemsPerPage: 10,
  };

  const elements = {
    bookList: document.getElementById('book-list'),
    searchInput: document.getElementById('search'),
    subjectSelect: document.getElementById('subject'),
    availableCheckbox: document.getElementById('available-only'),
    sortSelect: document.getElementById('sort'),
  };

  const pagination = new Pagination('pagination', (page) => {
    state.currentPage = page;
    render();
  });

  const breadcrumbs = new Breadcrumbs('breadcrumbs');
  breadcrumbs.render([
    { label: 'Home', url: 'index.html' },
    { label: 'Catalog', url: null },
  ]);

  // Initial Data Load
  try {
    const [books, subjects] = await Promise.all([
      ApiClient.get('/books'),
      ApiClient.get('/subjects'),
    ]);

    state.books = books;
    state.subjects = subjects;

    renderSubjects();
    render();
  } catch (error) {
    console.error('Failed to load catalog data', error);
    elements.bookList.innerHTML = '<p>Error loading catalog.</p>';
  }

  // Event Listeners
  elements.searchInput.addEventListener('input', (e) => {
    state.filters.search = e.target.value;
    state.currentPage = 1;
    render();
  });

  elements.subjectSelect.addEventListener('change', (e) => {
    state.filters.subjectId = e.target.value;
    state.currentPage = 1;
    render();
  });

  elements.availableCheckbox.addEventListener('change', (e) => {
    state.filters.availableOnly = e.target.checked;
    state.currentPage = 1;
    render();
  });

  elements.sortSelect.addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    render();
  });

  function renderSubjects() {
    elements.subjectSelect.innerHTML = `<option value="">All Subjects</option>${
      state.subjects.map((sub) => `<option value="${sub.id}">${sub.name}</option>`).join('')}`;
  }

  function render() {
    const filtered = filterBooks(state.books, state.filters);
    const sorted = sortBooks(filtered, state.sortBy);
    const { data, totalPages } = paginate(sorted, state.currentPage, state.itemsPerPage);

    renderBooks(data);
    pagination.render(state.currentPage, totalPages);
  }

  function renderBooks(books) {
    if (books.length === 0) {
      elements.bookList.innerHTML = '<p>No books found.</p>';
      return;
    }

    elements.bookList.innerHTML = books.map((book) => `
      <a href="book.html?id=${book.id}" class="book-card">
        <img src="${book.coverUrl}" alt="${book.title}">
        <div class="book-card__info">
          <h4>${book.title}</h4>
          <p>${book.author}</p>
          <div class="status ${book.isLoaned ? 'status--loaned' : 'status--available'}">
            ${book.isLoaned ? `Due: ${book.dueDate}` : 'Available'}
          </div>
        </div>
      </a>
    `).join('');
  }
}
