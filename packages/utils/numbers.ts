export const formatNumber = (num: number) => {
  if (typeof num !== "number") return "0";

  if (num >= 1000000000000) {
    return `${(num / 1000000000000).toFixed(2)}T`;
  }

  if (num >= 1000000000 && num < 1000000000000) {
    return `${(num / 1000000000).toFixed(2)}B`;
  }

  if (num >= 1000000 && num < 1000000000) {
    return `${(num / 1000000).toFixed(2)}M`;
  }

  if (num >= 100000) {
    return `${(num / 1000).toFixed(2)}K`;
  }

  // Handle large numbers (1000+)
  if (num >= 1000) {
    return num.toLocaleString(undefined, {
      maximumFractionDigits: 0,
    });
  }

  // Handle regular numbers (1-999)
  if (num >= 1) {
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  // Handle small numbers (0.1-0.9999...)
  if (num > 0) {
    // Find the first non-zero decimal place
    const decimalPlaces = Math.max(
      2, // minimum 2 decimal places
      -Math.floor(Math.log10(num)) + 1, // dynamic decimal places based on number size
    );

    return num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: decimalPlaces,
    });
  }

  // Handle zero and negative numbers
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
