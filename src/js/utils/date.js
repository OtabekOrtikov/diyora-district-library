export function getTodayDateString() {
  return new Date().toISOString().split('T')[0];
}

export function validateLoanDates(start, end) {
  const today = getTodayDateString();

  if (!start) return { valid: false, message: 'Start date is required.' };
  if (!end) return { valid: false, message: 'End date is required.' };

  if (start < today) {
    return { valid: false, message: 'Start date cannot be in the past.' };
  }

  if (end <= start) {
    return { valid: false, message: 'End date must be after start date.' };
  }

  return { valid: true };
}
