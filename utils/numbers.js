export const formatNumber = (incomingNumber) => {
  if (incomingNumber > 1000) {
    return incomingNumber?.toLocaleString(undefined, {
      maximumFractionDigits: 0,
    })
  } else if (incomingNumber > 1) {
    return incomingNumber?.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  } else if (incomingNumber < 0.0000001) {
    return incomingNumber?.toLocaleString(undefined, {
      minimumFractionDigits: 9,
    })
  } else if (incomingNumber < 0.000001) {
    return incomingNumber?.toLocaleString(undefined, {
      minimumFractionDigits: 8,
    })
  } else if (incomingNumber < 0.00001) {
    return incomingNumber?.toLocaleString(undefined, {
      minimumFractionDigits: 7,
    })
  } else if (incomingNumber < 0.0001) {
    return incomingNumber?.toLocaleString(undefined, {
      minimumFractionDigits: 6,
    })
  } else if (incomingNumber < 0.001) {
    return incomingNumber?.toLocaleString(undefined, {
      minimumFractionDigits: 5,
    })
  } else if (incomingNumber < 0.01) {
    return incomingNumber?.toLocaleString(undefined, {
      minimumFractionDigits: 4,
    })
  } else {
    return incomingNumber?.toLocaleString(undefined, {
      minimumFractionDigits: 2,
    })
  }
}
