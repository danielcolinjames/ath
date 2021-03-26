export const formatNumber = (incomingNumber) => {
  if (incomingNumber > 1000) {
    return incomingNumber?.toLocaleString(undefined, {
      maximumFractionDigits: 0,
    });
  } else if (incomingNumber > 1) {
    return incomingNumber?.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  } else if (incomingNumber < 0.01) {
    return incomingNumber?.toLocaleString(undefined, {
      minimumFractionDigits: 4,
    });
  } else {
    return incomingNumber?.toLocaleString(undefined, {
      minimumFractionDigits: 2,
    });
  }
};
