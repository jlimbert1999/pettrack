export const EnvConfig = () => ({
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
  host: process.env.HOST,
  jwt_key: process.env.JWT_TOKEN,
});
