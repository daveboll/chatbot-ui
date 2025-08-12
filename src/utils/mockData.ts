import { Case, Chat, Fault } from '../types';

export const mockCases: Case[] = [
  {
    id: '1',
    number: 'CASE-001',
    title: 'Network Connectivity Issues',
    status: 'open',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T14:45:00Z'
  },
  {
    id: '2',
    number: 'CASE-002',
    title: 'Database Performance Problems',
    status: 'open',
    createdAt: '2024-01-14T09:15:00Z',
    updatedAt: '2024-01-15T11:20:00Z'
  },
  {
    id: '3',
    number: 'CASE-003',
    title: 'Application Crashes',
    status: 'resolved',
    createdAt: '2024-01-13T16:45:00Z',
    updatedAt: '2024-01-14T10:30:00Z'
  },
  {
    id: '4',
    number: 'CASE-004',
    title: 'User Authentication Failures',
    status: 'open',
    createdAt: '2024-01-12T13:20:00Z',
    updatedAt: '2024-01-15T08:15:00Z'
  },
  {
    id: '5',
    number: 'CASE-005',
    title: 'API Response Time Issues',
    status: 'open',
    createdAt: '2024-01-11T11:00:00Z',
    updatedAt: '2024-01-15T12:30:00Z'
  }
];

export const mockChats: Chat[] = [
  {
    id: '1',
    caseId: '1',
    messages: [
      {
        id: '1',
        type: 'bot',
        content: 'Hello! I\'m here to help you troubleshoot your network connectivity issues. Can you tell me more about what you\'re experiencing?',
        timestamp: '2024-01-15T10:30:00Z',
        options: ['Slow connection', 'No connection', 'Intermittent drops', 'High latency']
      },
      {
        id: '2',
        type: 'user',
        content: 'Slow connection',
        timestamp: '2024-01-15T10:31:00Z'
      },
      {
        id: '3',
        type: 'bot',
        content: 'I understand you\'re experiencing slow connection issues. Let me help you diagnose this. What type of network are you using?',
        timestamp: '2024-01-15T10:31:30Z',
        options: ['WiFi', 'Ethernet', 'Mobile data', 'VPN']
      }
    ],
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:31:30Z'
  }
];

export const mockFaults: Fault[] = [
  {
    id: '1',
    category: 'Network',
    symptom: 'Slow Connection',
    description: 'Network throughput is significantly below expected levels',
    status: 'in-progress',
    notes: 'Testing different network configurations'
  },
  {
    id: '2',
    category: 'Hardware',
    symptom: 'Router Issues',
    description: 'Router may be overheating or experiencing hardware failure',
    status: 'none',
    notes: ''
  },
  {
    id: '3',
    category: 'Configuration',
    symptom: 'DNS Problems',
    description: 'DNS resolution may be causing connection delays',
    status: 'ruled-out',
    notes: 'DNS settings verified and working correctly'
  },
  {
    id: '4',
    category: 'Software',
    symptom: 'Driver Issues',
    description: 'Network adapter drivers may be outdated or corrupted',
    status: 'none',
    notes: ''
  }
];

export const getFaultsByCategory = (category: string): Fault[] => {
  return mockFaults.filter(fault => fault.category === category);
};

export const getFaultsBySymptom = (symptom: string): Fault[] => {
  return mockFaults.filter(fault => fault.symptom === symptom);
};
