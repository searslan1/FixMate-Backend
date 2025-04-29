import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

// Şifreyi hash'lemek
export const hashPassword = async (plainPassword: string): Promise<string> => {
  const hashed = await bcrypt.hash(plainPassword, SALT_ROUNDS);
  return hashed;
};

// Şifreyi doğrulamak
export const comparePasswords = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch;
};
