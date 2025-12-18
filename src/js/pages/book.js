import ApiClient from '../api/client.js';
import Breadcrumbs from '../components/breadcrumbs.js';
import { validateLoanDates, getTodayDateString } from '../utils/date.js';

export default async function initBook() {
  console.log('Book page initialized');

  const params = new URLSearchParams(window.location.search);
  const bookId = params.get('id');
  const container = document.getElementById('book-details');
  const breadcrumbs = new Breadcrumbs('breadcrumbs');

  if (!bookId) {
    container.innerHTML = '<p>Book not found.</p>';
    return;
  }

  try {
    const book = await ApiClient.get(`/books/${bookId}`);

    breadcrumbs.render([
      { label: 'Home', url: 'index.html' },
      { label: 'Catalog', url: 'catalog.html' },
      { label: book.title, url: null },
    ]);

    renderBookDetails(book);
  } catch (error) {
    console.error('Failed to load book', error);
    container.innerHTML = '<p>Error loading book details.</p>';
  }

  function renderBookDetails(book) {
    container.innerHTML = `
      <div class="book-details__cover">
        <img src="${book.coverUrl}" alt="${book.title}">
      </div>
      <div class="book-details__info">
        <h1>${book.title}</h1>
        <p class="author">by ${book.author}</p>
        <div class="description">
          <p>${book.description}</p>
        </div>
        
        <div class="status-box">
          ${book.isLoaned ? renderLoanedState(book) : renderCheckoutForm(book)}
        </div>
      </div>
    `;

    if (!book.isLoaned) {
      setupCheckoutForm(book);
    }
  }

  function renderLoanedState(book) {
    return `
      <h3>Currently on Loan</h3>
      <p class="loaned-msg">This book is checked out until ${book.dueDate}.</p>
    `;
  }

  // eslint-disable-next-line no-unused-vars
  function renderCheckoutForm(book) {
    return `
      <h3>Checkout Book</h3>
      <form id="checkout-form">
        <div class="form-group">
          <label for="start-date">Start Date</label>
          <input type="date" id="start-date" min="${getTodayDateString()}" required>
          <span class="error" id="start-error"></span>
        </div>
        <div class="form-group">
          <label for="end-date">End Date</label>
          <input type="date" id="end-date" min="${getTodayDateString()}" required>
          <span class="error" id="end-error"></span>
        </div>
        <button type="submit">Confirm Loan</button>
      </form>
    `;
  }

  function setupCheckoutForm(book) {
    const form = document.getElementById('checkout-form');
    const startInput = document.getElementById('start-date');
    const endInput = document.getElementById('end-date');
    // const startError = document.getElementById('start-error');
    // const endError = document.getElementById('end-error');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const start = startInput.value;
      const end = endInput.value;

      const validation = validateLoanDates(start, end);

      if (!validation.valid) {
        // eslint-disable-next-line no-alert
        alert(validation.message);
        return;
      }

      try {
        await ApiClient.patch(`/books/${book.id}`, {
          isLoaned: true,
          loanStart: start,
          loanEnd: end,
          dueDate: end,
        });

        // eslint-disable-next-line no-alert
        alert('Book checked out successfully!');
        window.location.reload();
      } catch (error) {
        console.error('Checkout failed', error);
        // eslint-disable-next-line no-alert
        alert('Failed to checkout book. Please try again.');
      }
    });
  }
}
