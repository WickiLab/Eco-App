export function normalizeSriLankanPhone(input: string): string {
  const digits = input.replace(/\D/g, '');

  if (digits.startsWith('94') && digits.length >= 11) {
    return digits.slice(2, 11);
  }

  if (digits.startsWith('0') && digits.length >= 10) {
    return digits.slice(1, 10);
  }

  return digits.slice(0, 9);
}

export function isValidSriLankanPhone(input: string): boolean {
  const phone = normalizeSriLankanPhone(input);
  return /^(7\d{8})$/.test(phone);
}

export function formatSriLankanPhone(input: string): string {
  const phone = normalizeSriLankanPhone(input);
  if (phone.length !== 9) return phone;

  return `${phone.slice(0, 2)} ${phone.slice(2, 5)} ${phone.slice(5, 9)}`;
}