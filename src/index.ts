import { serve } from "bun";
import index from "./index.html";

const server = serve({
  routes: {
    "/configs/*": async (req) => {
      const url = new URL(req.url);
      const filePath = `./src${url.pathname}`;
      const file = Bun.file(filePath);
      if (await file.exists()) {
        return new Response(file, {
          headers: {
            "Content-Disposition": `attachment; filename="${url.pathname.split("/").pop()}"`,
          },
        });
      }
      return new Response("Not found", { status: 404 });
    },
    "/*": index,
  },

  development: process.env.NODE_ENV !== "production" && {
    hmr: true,
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
