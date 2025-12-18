import { jest } from '@jest/globals';
import { validateLoanDates } from '../src/js/utils/date.js';

describe('Date Validation Utility', () => {
    // Mock today as 2025-12-18
    beforeAll(() => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date('2025-12-18'));
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    test('should fail if start date is missing', () => {
        const result = validateLoanDates('', '2025-12-20');
        expect(result.valid).toBe(false);
    });

    test('should fail if start date is in the past', () => {
        const result = validateLoanDates('2025-12-17', '2025-12-20');
        expect(result.valid).toBe(false);
    });

    test('should fail if end date is before start date', () => {
        const result = validateLoanDates('2025-12-19', '2025-12-18');
        expect(result.valid).toBe(false);
    });

    test('should pass for valid dates', () => {
        const result = validateLoanDates('2025-12-18', '2025-12-20');
        expect(result.valid).toBe(true);
    });
});
