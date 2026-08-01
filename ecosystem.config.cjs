module.exports = {
  apps: [
    {
      name: "cineguru-studio",
      cwd: __dirname,
      script: "./node_modules/.bin/vinext",
      args: "start --hostname 127.0.0.1 --port 3000",
      interpreter: "none",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_memory_restart: "750M",
      env_production: {
        NODE_ENV: "production",
        PORT: "3000",
      },
    },
  ],
};
