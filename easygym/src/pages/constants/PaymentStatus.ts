export interface PaymentProps {
  status: PaymentStatus;
}

 export enum PaymentStatus {
    PAID = 'PAGO',
    PENDING = 'AGUARDANDO \nPAGAMENTO',
    UPCOMING = 'A VENCER',
  }