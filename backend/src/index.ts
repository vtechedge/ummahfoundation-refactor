import { createServer } from "./server";
import { connectDB } from "./config/db";
import { env } from "./config/env";

async function main() {
  await connectDB();
  const app = createServer();
  app.listen(env.PORT, () => {
    console.log(`Ummah Foundation API running on http://localhost:${env.PORT}`);
  });
}

main().catch((err) => {
  console.error("Startup error:", err);
  process.exit(1);
});
