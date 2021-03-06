import http from "http";
import fs from "fs";
import mime from "mime";
import { handler as ssrHandler } from "./dist/server/entry.mjs";

const clientRoot = new URL("./dist/client/", import.meta.url);

http
  .createServer(async (req, res) => {
    let local = new URL("." + req.url, clientRoot);
    try {
      const data = await fs.promises.readFile(local);
      res.writeHead(200, {
        "Cache-Control": "max-age=120",
        "Content-Type": mime.getType(req.url),
      });
      res.end(data);
    } catch {
      //res.writeHead(404);
      //res.end();
      ssrHandler(req, res, (err) => {
        if (err) {
          res.writeHead(500);
          res.end(err.toString());
        } else {
          // Serve your static assets here maybe?
          // 404?
          const errReq = req;
          req.url = "/404";
          res.writeHead(404);
          ssrHandler(errReq, res, (err) => {
            res.end();
          });
          /*res.writeHead(404);
          res.end();*/
        }
      });
    }
  })
  .listen(8080);
