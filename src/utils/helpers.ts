// -----------------------------------------------------------------------------
// Utility helpers
// -----------------------------------------------------------------------------

/**
 * Simple debounce implementation to postpone an execution until after a wait time.
 * Replicates the lodash debounce API for our limited needs.
 * Using an inline implementation keeps the bundle size minimal.
 */
const debounce = <F extends (...args: unknown[]) => unknown>(
  func: F,
  wait: number
) => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  return ((...args: Parameters<F>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore – exhaustive generic inference already handled above
      func(...args);
    }, wait);
  }) as F;
};

function convertArrayToCSV(
  dataArray: unknown[],
  headerMapping: Record<string, string> | null = null
) {
  if (!dataArray || dataArray.length === 0) return "";

  // Utility: Format keys like camelCase or snake_case to Title Case
  const formatHeader = (key) =>
    key
      .replace(/_/g, " ") // snake_case to space
      .replace(/([a-z])([A-Z])/g, "$1 $2") // camelCase to space
      .replace(/\b\w/g, (c) => c.toUpperCase());

  // Step 1: Build headers and key list
  let headers, keys;
  if (headerMapping && typeof headerMapping === "object") {
    headers = Object.keys(headerMapping);
    keys = headers.map((header) => headerMapping[header]);
  } else {
    keys = Object.keys(dataArray[0]);
    headers = keys.map(formatHeader);
  }

  // Step 2: Construct CSV rows
  const csvRows = [
    headers.join(","), // Header row
    ...dataArray.map((row) =>
      keys
        .map((field) => {
          let value = row[field];
          if (value === null || value === undefined) value = "";
          value = String(value).replace(/"/g, '""'); // Escape double quotes
          return `"${value}"`;
        })
        .join(",")
    ),
  ];

  return csvRows.join("\n");
}

// Format currency
const formatCurrency = (
  amount: number,
  config?: { isInCents?: boolean } & Intl.NumberFormatOptions
): string => {
  const defaultConfig: Intl.NumberFormatOptions = {
    style: "currency",
    currency: "USD",
    useGrouping: true,
  };

  const isInCents = config?.isInCents ?? true;
  const formattingConfig = { ...defaultConfig, ...(config || {}) };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (formattingConfig as any).isInCents;

  const amountInDollars = isInCents ? amount / 100 : amount;
  return new Intl.NumberFormat("en-US", formattingConfig).format(
    amountInDollars
  );
};

export { debounce, convertArrayToCSV, formatCurrency };
