import { Production } from '@/domain/entities/Production';

export interface ProductionRepository {
  listProductions(): Promise<Production[]>;

  getProductionById(uid: Production['uid']): Promise<Production | null>;

  createProduction(production: Production): Promise<Production>;

  updateProduction(production: Production): Promise<Production>;

  deleteProduction(uid: Production['uid']): Promise<void>;
}
