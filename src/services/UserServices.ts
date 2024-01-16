import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Response } from "express"
import prismaCustom from "../prisma"


interface CreateUserProps {
  name?: string,
  email?: string,
  password?: string,
  res: Response,
}

class UserServices {

  async createUser({ email, name, password, res }: CreateUserProps) {

    try {

      if (!email || !name || !password) {
        return res.status(400).json({ msg: "erro ao criar usuario preencha os campos" })
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const usuario = await prismaCustom.usuario.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
        }
      });

      res.status(201).json({ msg: "Usuario criado com sucesso", user: usuario });
    } catch (error) {
      return res.status(400).json({ msg: "erro ao criar usuario preencha os campos", error: error })
    }

  }


  async loginUser({ email, password, res }: CreateUserProps) {

    const usuario = await prismaCustom.usuario.findUnique({
      where: {
        email: email
      }
    });

    if (!usuario) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const passwordMatch = bcrypt.compare(password!, usuario?.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ userId: usuario.id }, 'secreto', {
      expiresIn: '1d',
    });

    usuario.password = "";

    res.status(200).json({ usuario, token });

  }
}

export { UserServices }