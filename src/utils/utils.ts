import * as bcrypt from 'bcrypt';

export const hashPassword = (password) => {
  const hash = bcrypt.hash(password, 10);
  return hash;
};

export const comparePassword = async (password, hashPassword) => {
  const result = await bcrypt.compare(password, hashPassword);
  return result;
};
