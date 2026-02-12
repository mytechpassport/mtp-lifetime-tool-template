import { formatDistanceToNow } from "date-fns";

export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

export const formatNumber = (num: number) =>
  new Intl.NumberFormat("en-US").format(num);

export const formatAddress = (address: string, length = 10) =>
  `${address.slice(0, length)}...${address.slice(-length)}`;

export const formatRelativeTime = (date: string) => {
  if (!date) return "";
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};
