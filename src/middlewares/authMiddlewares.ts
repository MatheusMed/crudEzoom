import { Response, Request, NextFunction } from "express"
import jwt from "jsonwebtoken";


interface TokenPayload {
  id: number,
  iat: number,
  exp: number,
}

export default function authMiddlewares(request: Request, response: Response, next: NextFunction) {

  const { authorization } = request.headers;

  if (!authorization) {
    throw response.sendStatus(401);
  }
  const token = authorization.replace('Bearer', '').trim()
  try {
    const data = jwt.verify(token, 'secreto');
    const { id } = data as TokenPayload;


    request.userId = id;

    next();

  } catch {
    throw response.sendStatus(401);
  }


}