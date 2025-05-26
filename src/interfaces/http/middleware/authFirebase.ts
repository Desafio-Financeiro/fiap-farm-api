import { NextFunction, Request, Response } from 'express';
import admin from '@/infra/firebase/FirebaseAdmin';

interface AuthenticatedRequest extends Request {
  user?: admin.auth.DecodedIdToken;
}

const authenticateFirebase = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Token não fornecido' });
      return;
    }

    const idToken = authHeader.split(' ')[1];
    req.user = await admin.auth().verifyIdToken(idToken);

    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido ou expirado' });
  }
};

export default authenticateFirebase;
