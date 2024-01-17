
import prismaCustom from "../prisma"
import { Request, Response } from "express";
import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';

interface CreateTaskProps {
  id?: number,
  userId: number,
  title?: string,
  desc?: string,
  res: Response,
}

class TasksServices {

  async CreateTask({ title, desc, userId, res }: CreateTaskProps) {
    try {
      if (!title || !desc || !userId) {
        return res.status(400).json({ msg: "Erro ao criar a tarefa. Preencha todos os campos." });
      }

      const userExists = await prismaCustom.usuario.findUnique({
        where: { id: userId },
      });

      if (!userExists) {
        return res.status(404).json({ msg: "Usuário não encontrado." });
      }

      const task = await prismaCustom.tasks.create({
        data: {
          title,
          desc,
          usuario: { connect: { id: userId } },
        },
      });

      res.status(201).json({ msg: "Tarefa criada com sucesso", task });
    } catch (error) {
      return res.status(400).json({ msg: "Erro ao criar a tarefa", error: error });
    }
  }


  async getListTasks({ res, userId }: CreateTaskProps) {
    try {
      const userExists = await prismaCustom.usuario.findUnique({
        where: { id: userId },
      });

      if (!userExists) {
        return res.status(404).json({ msg: "Usuário não encontrado." });
      }

      const getListaTasks = await prismaCustom.tasks.findMany({
        where: {
          userId: userId,
        },
      });

      res.status(200).json({ getListaTasks });
    } catch (error) {
      return res.status(404).json({ msg: "Erro ao buscar as tarefas", error: error });
    }
  }

  async getTaskByTaksId({ res, userId, id }: CreateTaskProps) {
    try {
      const userExists = await prismaCustom.usuario.findUnique({
        where: { id: userId },
      });

      if (!userExists) {
        return res.status(404).json({ msg: "Usuário não encontrado." });
      }

      const task = await prismaCustom.tasks.findUnique({
        where: { id: id, userId: userId },
      });

      if (!task) {
        return res.status(400).json({ msg: `Erro ao buscar a tarefa, este id ${id} não existe` });
      }

      res.status(200).json({ task });
    } catch (error) {
      return res.status(500).json({ msg: "Erro ao buscar a tarefa", error: error });
    }
  }

  async UpdateTask({ res, userId, id, title, desc }: CreateTaskProps) {
    try {
      if (!id || (!title && !desc)) {
        return res.status(400).json({ msg: "Erro ao atualizar a tarefa. Forneça o ID da tarefa e pelo menos um campo (title ou desc)." });
      }

      const existingTask = await prismaCustom.tasks.findUnique({
        where: {
          id: id,
          userId: userId,
        },
      });

      if (!existingTask) {
        return res.status(404).json({ msg: "Tarefa não encontrada." });
      }

      const updatedTask = await prismaCustom.tasks.update({
        where: {
          id: id,
          userId: userId,
        },
        data: {
          title: title || existingTask.title,
          desc: desc || existingTask.desc,
        },
      });

      res.status(200).json({ msg: "Tarefa atualizada com sucesso", task: updatedTask });
    } catch (error) {
      return res.status(500).json({ msg: "Erro ao atualizar a tarefa", error: error });
    }
  }

  async deleteTask({ id, res, userId }: CreateTaskProps) {
    try {
      const existingTask = await prismaCustom.tasks.findUnique({
        where: {
          id: id,
          userId: userId,
        },
      });

      if (!existingTask) {
        return res.status(404).json({ msg: "Tarefa não encontrada." });
      }

      await prismaCustom.tasks.delete({
        where: {
          id: existingTask.id,
        },
      });

      res.status(200).json({ msg: "Tarefa deletada com sucesso" });
    } catch (error) {
      return res.status(500).json({ msg: "Erro ao deletar a tarefa", error: error });
    }
  }


}


export { TasksServices }