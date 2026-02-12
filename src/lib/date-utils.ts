import { format } from "date-fns";
import { toZonedTime, fromZonedTime } from "date-fns-tz";

export const getUserTimeZone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone;

export const formatUtcToUserTimezone = (
  utcDateString: string,
  formatStr = "MMM dd, yyyy h:mm a"
) => {
  if (!utcDateString) return "";
  const userTimeZone = getUserTimeZone();
  const dateInUserTimezone = toZonedTime(
    new Date(utcDateString),
    userTimeZone
  );
  return format(dateInUserTimezone, formatStr);
};

export const convertUserTimeToUtc = (
  localDateString: string,
  userTimeZone?: string
) => {
  const tz = userTimeZone || getUserTimeZone();
  return fromZonedTime(new Date(localDateString), tz);
};
