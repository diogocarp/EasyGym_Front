export interface PaymentProps {
  status: PaymentStatus;
}

 export enum PaymentStatus {
    PAID = 'Pago',
    PENDING = 'Aguardando \nPagamento',
    UPCOMING = 'A Vencer',
  }