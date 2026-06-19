import { toKobo } from "@/lib/currency";

const PAYSTACK_BASE = "https://api.paystack.co";

export function getPaystackSecretKey() {
  return process.env.PAYSTACK_SECRET_KEY ?? "";
}

export function isPaystackConfigured() {
  return Boolean(getPaystackSecretKey() && process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY);
}

export function createOrderReference() {
  return `MMS-${Date.now().toString(36).toUpperCase()}`;
}

type InitializeOptions = {
  email: string;
  amountUsd: number;
  reference: string;
  callbackUrl: string;
  metadata: Record<string, string>;
};

export async function initializePaystackTransaction(options: InitializeOptions) {
  const secretKey = getPaystackSecretKey();
  if (!secretKey) {
    return { ok: false as const, error: "Paystack is not configured." };
  }

  const response = await fetch(`${PAYSTACK_BASE}/transaction/initialize`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: options.email,
      amount: toKobo(options.amountUsd),
      reference: options.reference,
      callback_url: options.callbackUrl,
      metadata: options.metadata,
      currency: "NGN",
    }),
  });

  const data = (await response.json()) as {
    status?: boolean;
    message?: string;
    data?: { authorization_url: string; reference: string };
  };

  if (!response.ok || !data.status || !data.data?.authorization_url) {
    return { ok: false as const, error: data.message ?? "Could not start Paystack payment." };
  }

  return {
    ok: true as const,
    authorizationUrl: data.data.authorization_url,
    reference: data.data.reference,
  };
}

export async function verifyPaystackTransaction(reference: string) {
  const secretKey = getPaystackSecretKey();
  if (!secretKey) {
    return { ok: false as const, error: "Paystack is not configured." };
  }

  const response = await fetch(`${PAYSTACK_BASE}/transaction/verify/${encodeURIComponent(reference)}`, {
    headers: { Authorization: `Bearer ${secretKey}` },
  });

  const data = (await response.json()) as {
    status?: boolean;
    message?: string;
    data?: {
      status: string;
      reference: string;
      amount: number;
      customer: { email: string };
      metadata?: Record<string, string>;
    };
  };

  if (!response.ok || !data.status || !data.data) {
    return { ok: false as const, error: data.message ?? "Payment verification failed." };
  }

  if (data.data.status !== "success") {
    return { ok: false as const, error: "Payment was not completed." };
  }

  return { ok: true as const, data: data.data };
}
