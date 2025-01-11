import { Response, Request } from "express";

export class IndexController {
  public getIndex(req: Request, res: Response): void {
    res.send("Hello, World!");
  }
}
