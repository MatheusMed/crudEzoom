
import { Request, Response } from "express";
import { UserServices } from "../services/UserServices";



class UserController {

  async createUser(req: Request, res: Response) {

    const { name, email, password } = req.body as { name: string, email: string, password: string };

    const userServices = new UserServices()



    await userServices.createUser({ email, name, password, res });

  }

  async LoginUser(req: Request, res: Response) {

    const { email, password } = req.body as { email: string, password: string };

    const userServices = new UserServices()

    await userServices.loginUser({ email, password, res });

  }
}

export { UserController }