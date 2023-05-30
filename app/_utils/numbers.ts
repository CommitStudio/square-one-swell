export const formatCurrency = (
  n: number,
  locale = 'en-US',
  maxFDigit = 2,
  minFDigit = 2
): string => {
  return Number(n).toLocaleString(locale, {
    maximumFractionDigits: maxFDigit,
    minimumFractionDigits: minFDigit
  });
};
