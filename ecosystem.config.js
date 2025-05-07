module.exports = {
  apps: [
    {
      name: 'nestjs-app',
      script: 'dist/main.js',
      instances: '2',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production', // Add your own environment variables
        PORT: process.env.PORT,
        SYSTEM_HOST: process.env.SYSTEM_HOST,
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT,
        DB_DATABASE: process.env.DB_DATABASE,
        DB_USERNAME: process.env.DB_USERNAME,
        DB_PASSWORD: process.env.DB_PASSWORD,
        SALT_ROUNDS: process.env.SALT_ROUNDS,
        JWT_SECRET: process.env.JWT_SECRET,
      },
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      pid_file: './logs/app.pid',
    },
  ],
};
