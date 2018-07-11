var MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/zerodha";

if (MONGODB_URL) {
  module.exports = {
    db: {
      name: 'db',
      connector: 'loopback-connector-mongodb',
      url: MONGODB_URL
    },
    zerodha: {
      host: "localhost",
      port: 3306,
      database: "ZStreamingQuotesDB",
      username: "admin",
      password: "password",
      name: "zerodha",
      connector: "mysql",
      user: "admin"
    },
    Email: {
      connector: "mail",
        transports: [{
          type: "smtp",
          host: "smtp.gmail.com",
          secure: true,
          auth: {
            user: "kuldeep",
            pass: "password"
          }
        }]
      }
    };
}
