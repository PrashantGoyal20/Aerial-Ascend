import crypto from "crypto";

export function tokenKey(token) {
  const h = crypto.createHash("sha256").update(token).digest("hex");
  return `auth:token:${h}`;
}