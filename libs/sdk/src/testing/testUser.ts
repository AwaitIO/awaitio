// A user for tests. The hash is precomputed, since hashing at the top of a CommonJS test file cannot be awaited.
export const testUser = {
  password: 'correct horse battery',
  passwordHash: 'scrypt$32768$8$1$kDDsnrVoY5D0/ooj9h6XnA==$uddNLvW+pwiK2I+EzGU7EBa/EgQ8CM1EWdbsIlmGLwg=',
  secret: 'test-secret-0123456789-0123456789',
};
