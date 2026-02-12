// Validation helper for decimal(10,2) database field
export const validatePrice = (
  price: number | string
): { isValid: boolean; error?: string } => {
  if (typeof price === "string" && price.trim() === "") {
    return { isValid: false, error: "Price is required" };
  }

  const numericPrice = typeof price === "string" ? parseFloat(price) : price;

  if (isNaN(numericPrice)) {
    return { isValid: false, error: "Please enter a valid price" };
  }

  if (numericPrice < 0) {
    return { isValid: false, error: "Price cannot be negative" };
  }

  if (numericPrice > 99999999.99) {
    return { isValid: false, error: "Price cannot exceed 99,999,999.99" };
  }

  // Check decimal places
  const decimalStr = numericPrice.toString();
  if (decimalStr.includes(".")) {
    const decimals = decimalStr.split(".")[1];
    if (decimals && decimals.length > 2) {
      return {
        isValid: false,
        error: "Price cannot have more than 2 decimal places",
      };
    }
  }

  return { isValid: true };
};

// Validation helper for deal value (also decimal(10,2) in database)
export const validateDealValue = (
  value: number | string
): { isValid: boolean; error?: string } => {
  if (typeof value === "string" && value.trim() === "") {
    return { isValid: false, error: "Deal value is required" };
  }

  const numericValue = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(numericValue)) {
    return { isValid: false, error: "Please enter a valid deal value" };
  }

  if (numericValue < 0) {
    return { isValid: false, error: "Deal value cannot be negative" };
  }

  if (numericValue > 99999999.99) {
    return { isValid: false, error: "Deal value cannot exceed 99,999,999.99" };
  }

  // Check decimal places
  const decimalStr = numericValue.toString();
  if (decimalStr.includes(".")) {
    const decimals = decimalStr.split(".")[1];
    if (decimals && decimals.length > 2) {
      return {
        isValid: false,
        error: "Deal value cannot have more than 2 decimal places",
      };
    }
  }

  return { isValid: true };
};
