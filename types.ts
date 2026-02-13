export interface InviteData {
  senderName: string;
  receiverName: string;
  message: string;
  date: string;
  location: string;
  photoUrl: string | null;
}

export enum AppStep {
  CREATE = 'CREATE',
  ASK = 'ASK',
  REVEAL = 'REVEAL',
}