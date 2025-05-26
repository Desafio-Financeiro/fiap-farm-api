import { Request, Response, NextFunction } from 'express';

function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  console.error(err);

  if (err instanceof Error) {
    res.status(500).json({ error: err.message });
  } else {
    res.status(500).json({ error: 'Erro interno desconhecido' });
  }
}

export default errorHandler;
