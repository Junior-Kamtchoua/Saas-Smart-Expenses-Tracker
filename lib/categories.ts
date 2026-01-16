export const CATEGORIES = ["Food", "Transport", "Rent", "Internet"] as const;

export type Category = (typeof CATEGORIES)[number];
