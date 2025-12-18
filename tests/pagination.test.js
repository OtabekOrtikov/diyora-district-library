import { paginate } from '../src/js/utils/pagination.js';

describe('Pagination Utility', () => {
    const items = Array.from({ length: 25 }, (_, i) => i + 1);

    test('should return correct page data', () => {
        const result = paginate(items, 1, 10);
        expect(result.data.length).toBe(10);
        expect(result.data[0]).toBe(1);
        expect(result.data[9]).toBe(10);
        expect(result.currentPage).toBe(1);
        expect(result.totalPages).toBe(3);
    });

    test('should return correct data for last page', () => {
        const result = paginate(items, 3, 10);
        expect(result.data.length).toBe(5);
        expect(result.data[0]).toBe(21);
        expect(result.data[4]).toBe(25);
    });

    test('should handle empty array', () => {
        const result = paginate([], 1, 10);
        expect(result.data.length).toBe(0);
        expect(result.totalPages).toBe(0);
    });
});
