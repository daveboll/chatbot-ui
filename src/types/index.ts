export interface Case {
  id: string;
  number: string;
  title: string;
  status: 'open' | 'resolved';
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: string;
  options?: string[];
  feedback?: 'thumbs-up' | 'thumbs-down' | null;
}

export interface Chat {
  id: string;
  caseId: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface Fault {
  id: string;
  category: string;
  symptom: string;
  description: string;
  status: 'in-progress' | 'ruled-out' | 'root-cause' | 'none';
  notes?: string;
}

export interface Passdown {
  id: string;
  caseId: string;
  summary: string;
  faults: Fault[];
  actions: string[];
  createdAt: string;
}

export type FaultStatus = 'in-progress' | 'ruled-out' | 'root-cause' | 'none';
