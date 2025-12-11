export function formatMoney(amountCent) {
  if (amountCent === null || amountCent === undefined || isNaN(amountCent)) {
    return '$0.00';
  }
  return `$${(amountCent / 100).toFixed(2)}`;
}