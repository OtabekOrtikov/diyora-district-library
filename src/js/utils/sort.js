export function sortBooks(books, sortBy) {
  const sorted = [...books];

  sorted.sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'author':
        return a.author.localeCompare(b.author);
      case 'dueDate':
        // If not loaned, treat as far future or null?
        // Requirement: "Sort (title, author, due date)"
        // Usually, available books (null due date) come first or last.
        // Let's put available books last if sorting by due date ascending.
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      default:
        return 0;
    }
  });

  return sorted;
}
