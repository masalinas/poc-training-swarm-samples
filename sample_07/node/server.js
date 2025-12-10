import fs from "fs";
import http from "http";

function readFileOrNull(path) {
  try {
    return fs.readFileSync(path, "utf8").trim();
  } catch (err) {
    return null;
  }
}

// Load config (Swarm config)
const configPath = "/app/config.json";
const config = JSON.parse(readFileOrNull(configPath) || "{}");

// Load secrets (Swarm secrets)
const dbUser = readFileOrNull("/run/secrets/db_user") || "NOT_FOUND";
const dbPass = readFileOrNull("/run/secrets/db_pass") || "NOT_FOUND";

// Simple HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify(
      {
        message: "MyApp is running",
        config,
        secrets: {
          dbUser,
          dbPass: dbPass !== "NOT_FOUND" ? "******" : "NOT_FOUND"
        }
      },
      null,
      2
    )
  );
});

server.listen(3000, () => {
  console.log("MyApp running on port 3000");
  console.log("Loaded config:", config);
  console.log("Loaded secret user:", dbUser);
});