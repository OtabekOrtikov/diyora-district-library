export default class Pagination {
  constructor(containerId, onPageChange) {
    this.container = document.getElementById(containerId);
    this.onPageChange = onPageChange;
  }

  render(currentPage, totalPages) {
    if (!this.container) return;

    this.container.innerHTML = '';

    if (totalPages <= 1) return;

    // Prev Button
    const prevBtn = document.createElement('button');
    prevBtn.textContent = 'Prev';
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener('click', () => this.onPageChange(currentPage - 1));
    this.container.appendChild(prevBtn);

    // Page Numbers
    // Simple implementation: show all pages or a subset.
    // For simplicity, let's show all if < 10, otherwise just simple prev/next + current.
    // Requirement doesn't specify complex pagination UI.

    for (let i = 1; i <= totalPages; i += 1) {
      const btn = document.createElement('button');
      btn.textContent = i;
      if (i === currentPage) btn.classList.add('active');
      btn.addEventListener('click', () => this.onPageChange(i));
      this.container.appendChild(btn);
    }

    // Next Button
    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Next';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener('click', () => this.onPageChange(currentPage + 1));
    this.container.appendChild(nextBtn);
  }
}
