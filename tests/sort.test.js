import { sortBooks } from '../src/js/utils/sort.js';

describe('Sort Utility', () => {
    const books = [
        { id: 1, title: 'B Book', author: 'Z Author', dueDate: null },
        { id: 2, title: 'A Book', author: 'A Author', dueDate: '2025-12-20' },
        { id: 3, title: 'C Book', author: 'M Author', dueDate: '2025-12-10' },
    ];

    test('should sort by title', () => {
        const result = sortBooks(books, 'title');
        expect(result[0].title).toBe('A Book');
        expect(result[1].title).toBe('B Book');
        expect(result[2].title).toBe('C Book');
    });

    test('should sort by author', () => {
        const result = sortBooks(books, 'author');
        expect(result[0].author).toBe('A Author');
        expect(result[1].author).toBe('M Author');
        expect(result[2].author).toBe('Z Author');
    });

    test('should sort by due date', () => {
        const result = sortBooks(books, 'dueDate');
        // Expected: 2025-12-10, 2025-12-20, null (available)
        expect(result[0].id).toBe(3);
        expect(result[1].id).toBe(2);
        expect(result[2].id).toBe(1);
    });
});
