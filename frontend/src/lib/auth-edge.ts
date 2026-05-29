type UserRole =
  | "USER"
  | "ADMIN";

interface EdgeTokenPayload {
  userId: string;
  email: string;
  role: UserRole;
  exp?: number;
  iat?: number;
}

/**
 * Verify JWT token in Edge runtime.
 *
 * Uses crypto.subtle for HMAC verification (compatible with Edge/Node).
 * Returns null if token is invalid or secret is missing.
 */
export async function verifyEdgeToken(
  token: string
): Promise<EdgeTokenPayload | null> {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    console.error("JWT_SECRET not configured in Edge runtime");
    return null;
  }

  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      return null;
    }

    const [headerPart, payloadPart, signaturePart] = parts;

    // Decode header and payload using base64url decoding
    const decodeBase64Url = (str: string): string => {
      const urlUnsafeStr = str.replace(/-/g, "+").replace(/_/g, "/");
      const padding = "=".repeat((4 - (urlUnsafeStr.length % 4)) % 4);
      return atob(urlUnsafeStr + padding);
    };

    const header = JSON.parse(decodeBase64Url(headerPart)) as { alg?: string };
    if (header.alg !== "HS256") {
      return null;
    }

    const payload = JSON.parse(
      decodeBase64Url(payloadPart)
    ) as Partial<EdgeTokenPayload>;

    // Validate payload structure
    if (
      typeof payload.userId !== "string" ||
      typeof payload.email !== "string" ||
      (payload.role !== "USER" && payload.role !== "ADMIN")
    ) {
      return null;
    }

    // Check expiration
    if (
      typeof payload.exp === "number" &&
      payload.exp * 1000 <= Date.now()
    ) {
      return null;
    }

    // Verify HMAC signature using crypto.subtle
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const signature = await crypto.subtle.sign(
      "HMAC",
      key,
      encoder.encode(`${headerPart}.${payloadPart}`)
    );

    // Convert signature to base64url
    const computedSignature = btoa(
      String.fromCharCode(...new Uint8Array(signature))
    )
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/g, "");

    if (computedSignature !== signaturePart) {
      return null;
    }

    return {
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
      exp: payload.exp,
      iat: payload.iat,
    };
  } catch (error) {
    console.error("JWT verification failed in Edge runtime:", error);
    return null;
  }
}