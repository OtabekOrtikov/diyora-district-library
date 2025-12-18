export function filterBooks(books, filters) {
  return books.filter((book) => {
    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const matchesTitle = book.title.toLowerCase().includes(searchTerm);
      const matchesAuthor = book.author.toLowerCase().includes(searchTerm);
      if (!matchesTitle && !matchesAuthor) return false;
    }

    // Subject filter
    if (filters.subjectId && book.subjectId !== parseInt(filters.subjectId, 10)) {
      return false;
    }

    // Availability filter
    if (filters.availableOnly && book.isLoaned) {
      return false;
    }

    return true;
  });
}
