// Shared temporary password store for admin authentication
// Stores passwords with expiry times
export const tempPasswords = new Map();

// Clean up expired passwords periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, data] of tempPasswords.entries()) {
    if (now > data.expiresAt) {
      tempPasswords.delete(key);
    }
  }
}, 30000); // Clean every 30 seconds
