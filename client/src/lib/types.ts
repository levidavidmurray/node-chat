export enum SenderType {
	Sent = "Sent",
	Received = "Received",
}

export interface Message {
	senderType: SenderType;
	text: string;
}
