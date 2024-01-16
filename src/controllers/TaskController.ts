import { Request, Response } from "express";
import { TasksServices } from "../services/TasksServices";
import prismaCustom from "../prisma";


class TaskController {

  async CreateTask(req: Request, res: Response) {

    const { userId, title, desc, } = req.body as { userId: number, title: string, desc: string };

    const userServices = new TasksServices();

    await userServices.CreateTask({ userId, title, desc, res });

  }

  async getListaTasks(req: Request, res: Response) {

    const { userId } = req.body as { userId: number };

    const userServices = new TasksServices();

    await userServices.getListTasks({ res, userId });

  }


  async getTasksById(req: Request, res: Response) {

    const { id, userId } = req.body as { id: number, userId: number };

    const userServices = new TasksServices();

    await userServices.getTaskByTaksId({ id, userId, res });

  }

  async updateTask(req: Request, res: Response) {

    const { id, title, desc, userId } = req.body as { id: number, title: string, desc: string, userId: number };

    const userServices = new TasksServices();

    await userServices.UpdateTask({ id, res, title, desc, userId });
  }

  async deleteTask(req: Request, res: Response) {
    const { id, userId } = req.body as { id: number, userId: number };
    const userServices = new TasksServices();

    await userServices.deleteTask({ id, res, userId });
  }

}

export { TaskController }