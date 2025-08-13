import { useState } from 'react';
import LeftPanel from './components/LeftPanel';
import ChatPanel from './components/ChatPanel';
import RightPanel from './components/RightPanel';
import TestComponent from './components/TestComponent';
import SimpleTest from './SimpleTest';
import { Case, Chat } from './types';
import { mockCases, mockChats } from './utils/mockData';

function App() {
  const [cases, setCases] = useState<Case[]>(mockCases);
  const [selectedCase, setSelectedCase] = useState<Case | null>(mockCases[0]);
  const [chats, setChats] = useState<Chat[]>(mockChats);
  const [currentChat, setCurrentChat] = useState<Chat | null>(mockChats[0]);
  const [expandedAccordion, setExpandedAccordion] = useState<'open' | 'resolved' | null>('open');
  const [isLeftPanelCollapsed, setIsLeftPanelCollapsed] = useState(false);

  const handleCaseSelect = (caseItem: Case) => {
    setSelectedCase(caseItem);
    const existingChat = chats.find(chat => chat.caseId === caseItem.id);
    if (existingChat) {
      setCurrentChat(existingChat);
    } else {
      // Create new chat for this case
      const newChat: Chat = {
        id: Date.now().toString(),
        caseId: caseItem.id,
        messages: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setChats(prev => [...prev, newChat]);
      setCurrentChat(newChat);
    }
  };

  const updateChat = (updatedChat: Chat) => {
    setChats(prev => prev.map(chat => 
      chat.id === updatedChat.id ? updatedChat : chat
    ));
    setCurrentChat(updatedChat);
  };

  const updateCaseStatus = (caseId: string, status: 'open' | 'resolved') => {
    setSelectedCase(prev => {
      if (prev && prev.id === caseId) {
        const updatedCase = {
          ...prev,
          status,
          updatedAt: new Date().toISOString()
        };
        return updatedCase;
      }
      return prev;
    });
    
    // Also update the cases list
    setCases(prev => prev.map(caseItem => 
      caseItem.id === caseId 
        ? { ...caseItem, status, updatedAt: new Date().toISOString() }
        : caseItem
    ));
    
    // Open the appropriate accordion when case status changes
    setExpandedAccordion(status);
  };

  const handleAccordionToggle = (status: 'open' | 'resolved' | null) => {
    if (expandedAccordion === status) {
      // If clicking the same accordion, collapse it
      setExpandedAccordion(null);
    } else {
      // Otherwise, expand the clicked accordion
      setExpandedAccordion(status);
    }
  };

  const toggleLeftPanel = () => {
    setIsLeftPanelCollapsed(!isLeftPanelCollapsed);
  };

  return (
    <div className="flex h-screen bg-red-500">
      {/* Test Component */}
      <TestComponent />
      
      {/* Simple Test */}
      <SimpleTest />
      
      {/* Simple Test Banner */}
      <div className="fixed top-0 right-0 z-50 bg-green-500 text-white p-2 m-4 rounded shadow-lg">
        🎯 APP COMPONENT UPDATED - {new Date().toLocaleTimeString()}
      </div>
      
      {/* Left Panel - Case Navigation */}
      <div className="relative">
        <LeftPanel 
          cases={cases}
          selectedCase={selectedCase}
          onCaseSelect={handleCaseSelect}
          expandedAccordion={expandedAccordion}
          onAccordionToggle={handleAccordionToggle}
          isCollapsed={isLeftPanelCollapsed}
          onToggleCollapse={toggleLeftPanel}
        />
      </div>

      {/* Middle Panel - Chat Interface */}
      <div className="flex-1 flex flex-col">
        <ChatPanel 
          chat={currentChat}
          onChatUpdate={updateChat}
          selectedCase={selectedCase}
        />
      </div>

      {/* Right Panel - Fault Management */}
      <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
        <RightPanel 
          selectedCase={selectedCase}
          currentChat={currentChat}
          onCaseResolved={updateCaseStatus}
        />
      </div>
    </div>
  );
}

export default App;
