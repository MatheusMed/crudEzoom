import { Router, Request, Response } from "express";
import { TaskController } from "./controllers/TaskController";
import authMiddlewares from "./middlewares/authMiddlewares";
import { UserController } from "./controllers/UserController";


const routes = Router();


routes.post("/createUser", (request: Request, response: Response) => {

  return new UserController().createUser(request, response);

});

routes.post("/loginUser", (request: Request, response: Response) => {

  return new UserController().LoginUser(request, response);
});

routes.post("/createTask", authMiddlewares, (request: Request, response: Response) => {

  return new TaskController().CreateTask(request, response);
});

routes.get("/listasTaks", authMiddlewares, (request: Request, response: Response) => {

  return new TaskController().getListaTasks(request, response);
});

routes.get("/getTaksById", authMiddlewares, (request: Request, response: Response) => {

  return new TaskController().getTasksById(request, response);
});

routes.post("/editingTaksById", authMiddlewares, (request: Request, response: Response) => {

  return new TaskController().updateTask(request, response);
});

routes.delete("/deleteTask", authMiddlewares, (request: Request, response: Response) => {

  return new TaskController().deleteTask(request, response);
});



export default routes;