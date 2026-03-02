import { formatMonthLabel, getMonthRange, isWithinRange, toJsDate } from "../utils";

describe("time utilities", () => {
  test("getMonthRange returns start inclusive and end exclusive", () => {
    const base = new Date(2026, 2, 15); // local time: March 15, 2026
    const { start, end } = getMonthRange(base, 0);

    expect(start.getFullYear()).toBe(2026);
    expect(start.getMonth()).toBe(2);
    expect(start.getDate()).toBe(1);

    expect(end.getFullYear()).toBe(2026);
    expect(end.getMonth()).toBe(3);
    expect(end.getDate()).toBe(1);

    expect(isWithinRange(start, { start, end })).toBe(true);
    expect(isWithinRange(new Date(end.getTime() - 1), { start, end })).toBe(true);
    expect(isWithinRange(end, { start, end })).toBe(false);
  });

  test("formatMonthLabel returns readable month+year", () => {
    const base = new Date(2026, 2, 15);
    const label = formatMonthLabel(base, 0);
    expect(label.toLowerCase()).toContain("march");
    expect(label).toContain("2026");
  });

  test("toJsDate supports Date and Firestore Timestamp-like objects", () => {
    const d = new Date("2026-03-01T00:00:00.000Z");
    expect(toJsDate(d)).toBe(d);

    const tsLike = { toMillis: () => d.getTime() };
    expect(toJsDate(tsLike)?.toISOString()).toBe(d.toISOString());
  });
});

