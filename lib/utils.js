export const currencyFormatter= (amount) => {
    const formatter = Intl.NumberFormat("en-IN", {
        currency: "INR",
        style:"currency"
    });

    return formatter.format(amount)
}

export const toJsDate = (value) => {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (typeof value?.toDate === "function") return value.toDate(); // Firestore Timestamp
  if (typeof value?.toMillis === "function") return new Date(value.toMillis()); // Firestore Timestamp-like
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
};

export const getMonthRange = (baseDate = new Date(), monthOffset = 0) => {
  const d = new Date(baseDate);
  const start = new Date(d.getFullYear(), d.getMonth() + monthOffset, 1, 0, 0, 0, 0);
  const end = new Date(d.getFullYear(), d.getMonth() + monthOffset + 1, 1, 0, 0, 0, 0);
  return { start, end };
};

export const isWithinRange = (date, { start, end }) => {
  const d = toJsDate(date);
  if (!d) return false;
  return d >= start && d < end;
};

export const formatMonthLabel = (baseDate = new Date(), monthOffset = 0) => {
  const d = new Date(baseDate.getFullYear(), baseDate.getMonth() + monthOffset, 1);
  return new Intl.DateTimeFormat("en-IN", { month: "long", year: "numeric" }).format(d);
};