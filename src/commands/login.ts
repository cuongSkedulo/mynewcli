import express from "express";
import Command from "@oclif/command";
import open from "open";

export class MyCommand extends Command {
  static description = "description of this example command";

  async run() {
    await open('https://www.npmjs.com/package/open');
    const app = express();
    const port = 3000;
    app.get("/", (req:express.Request, res:express.Response) => {
      res.send("The sedulous hyena ate the antelope!");
      server.close();
      return console.log(`server is shutdown`);
    });
    let server = app.listen(port, () => {
      return console.log(`server is listening on ${port}`);
    });
    server.setTimeout();
  }
}
