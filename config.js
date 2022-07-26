module.exports = {
  rest: {
    port: +(process.env.PORT || 3000),
    host: process.env.HOST,
    // The `gracePeriodForClose` provides a graceful close for http/https
    // servers with keep-alive clients. The default value is `Infinity`
    // (don't force-close). If you want to immediately destroy all sockets
    // upon stop, set its value to `0`.
    // See https://www.npmjs.com/package/stoppable
    gracePeriodForClose: 5000, // 5 seconds
    openApiSpec: {
      // useful when used with OpenAPI-to-GraphQL to locate your application
      setServersFromRequest: true,
    },
    cors: {
      origin: process.env.CORS_ORIGINS.split(','),
    },
  },
  rabbitmq: {
    uri: process.env.RABBITMQ_URI,
  },
  jwt: {
    secret: "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAk3aXesgROLlvL8YtAgwWvh0UnSHR6SY7Jgr2YGAoyXTCWNEMYhTy0+OJY7FNlyTC+A324skpbPTr1nwRI15GvWzJz9DzrPiSjRHE9IQAfMbjY0/NGkUgbXXNcFzyykUyfVhK40FZ1NC9xnsNJ03mCnodO5Gk24Jccycd2GTxrpeAXXNM1y4+YPgLwRoc4O5axt/UAupYE/iJwDkLCXp0P5T6deU2nidpdFyXIRFkPrhBbEtmYLqcFp4dWet91TVhxZKoUPShdyKjeJi+cv0WE0x5+HJGVZjZe5K1LuTr/XUj454idwygy1pcwN/2zcG62u3O6t9KfHYM4YvcYKLDBwIDAQAB\n-----END PUBLIC KEY-----",
    algorithms: ['RS256']
  }
};
