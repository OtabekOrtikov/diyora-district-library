import { filterBooks } from '../src/js/utils/filter.js';

describe('Filter Utility', () => {
    const books = [
        { id: 1, title: 'JS Basics', author: 'John Doe', subjectId: 1, isLoaned: false },
        { id: 2, title: 'Advanced CSS', author: 'Jane Smith', subjectId: 1, isLoaned: true },
        { id: 3, title: 'History of Art', author: 'Bob Ross', subjectId: 2, isLoaned: false },
    ];

    test('should filter by title search', () => {
        const result = filterBooks(books, { search: 'Basics' });
        expect(result.length).toBe(1);
        expect(result[0].id).toBe(1);
    });

    test('should filter by author search', () => {
        const result = filterBooks(books, { search: 'Jane' });
        expect(result.length).toBe(1);
        expect(result[0].id).toBe(2);
    });

    test('should filter by subject', () => {
        const result = filterBooks(books, { subjectId: '2' });
        expect(result.length).toBe(1);
        expect(result[0].id).toBe(3);
    });

    test('should filter by availability', () => {
        const result = filterBooks(books, { availableOnly: true });
        expect(result.length).toBe(2);
        expect(result.find(b => b.id === 2)).toBeUndefined();
    });

    test('should combine filters', () => {
        const result = filterBooks(books, { subjectId: '1', availableOnly: true });
        expect(result.length).toBe(1);
        expect(result[0].id).toBe(1);
    });
});
