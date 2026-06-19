export const NGN_RATE = Number(process.env.NGN_EXCHANGE_RATE ?? 1600);

export function toNaira(usd: number) {
  return Math.round(usd * NGN_RATE);
}

export function toKobo(usd: number) {
  return toNaira(usd) * 100;
}

export function formatNaira(usd: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(toNaira(usd));
}
