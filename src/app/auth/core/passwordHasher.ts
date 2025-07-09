import crypto from "crypto";

export function hashPassword(password: string, salt: string) {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password.normalize(), salt, 64, (error, hash) => {
      if (error) reject();

      resolve(hash.toString("hex").normalize());
    });
  });
}

export function generateRandomSalt() {
  return crypto.randomBytes(16).toString("hex").normalize();
}
