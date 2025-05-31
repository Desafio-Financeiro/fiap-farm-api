export interface InventoryMovement {
  uid?: string;
  productId: string;
  type: TypeInventoryMovement; // "entrada", "saida"
  quantity: number;
  source: SourceInventoryMovement; // ex: "producao", "venda"
  referenceId: string; // ID da venda ou produção
  createdAt?: Date;
}

export enum SourceInventoryMovement {
  SALE = 'SALE',
  PRODUCTION = 'PRODUCTION',
}
export enum TypeInventoryMovement {
  ENTRY = 'ENTRY',
  EXIT = 'EXIT',
}
