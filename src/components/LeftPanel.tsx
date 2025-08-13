import React, { useState, useMemo } from 'react';
import { Search, MessageSquare } from 'lucide-react';
import { Case } from '../types';
import CaseAccordion from './CaseAccordion';

interface LeftPanelProps {
  cases: Case[];
  selectedCase: Case | null;
  onCaseSelect: (caseItem: Case) => void;
  expandedAccordion: 'open' | 'resolved' | null;
  onAccordionToggle: (status: 'open' | 'resolved' | null) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const LeftPanel: React.FC<LeftPanelProps> = ({ 
  cases, 
  selectedCase, 
  onCaseSelect, 
  expandedAccordion, 
  onAccordionToggle,
  isCollapsed = false,
  onToggleCollapse
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCases = useMemo(() => {
    if (!searchTerm) return cases;
    return cases.filter(caseItem => 
      caseItem.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [cases, searchTerm]);

  const openCases = useMemo(() => 
    filteredCases.filter(caseItem => caseItem.status === 'open'), 
    [filteredCases]
  );

  const resolvedCases = useMemo(() => 
    filteredCases.filter(caseItem => caseItem.status === 'resolved'), 
    [filteredCases]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={`flex flex-col h-full bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-16' : 'w-80'}`}>
      {/* SUPER OBVIOUS TEST ELEMENT */}
      <div className="bg-yellow-400 text-black p-4 text-center font-bold text-lg border-4 border-red-500">
        🚨 COLLAPSE TEST - CLICK RED BUTTON BELOW! 🚨
      </div>
      
      {/* Test Header - Always Visible */}
      <div className="bg-blue-600 text-white p-3 text-center font-bold">
        {isCollapsed ? '📁' : '📁 CASES PANEL'}
      </div>
      
      {/* Toggle Button */}
      <div className="absolute -right-6 top-20 z-50">
        <button
          onClick={onToggleCollapse}
          className="bg-red-600 hover:bg-red-700 border-2 border-white rounded-full p-4 shadow-xl text-white font-bold text-lg"
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>

      {/* Content - Hidden when collapsed */}
      {!isCollapsed && (
        <>
          {/* Search Bar */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search cases..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Cases List */}
          <div className="flex-1 overflow-y-auto">
            {filteredCases.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                {searchTerm ? 'No cases found' : 'No cases available'}
              </div>
            ) : (
              <div className="flex flex-col h-full">
                <CaseAccordion
                  title="Open Cases"
                  cases={openCases}
                  status="open"
                  selectedCase={selectedCase}
                  onCaseSelect={onCaseSelect}
                  isExpanded={expandedAccordion === 'open'}
                  onToggle={onAccordionToggle}
                />
                <CaseAccordion
                  title="Resolved Cases"
                  cases={resolvedCases}
                  status="resolved"
                  selectedCase={selectedCase}
                  onCaseSelect={onCaseSelect}
                  isExpanded={expandedAccordion === 'resolved'}
                  onToggle={onAccordionToggle}
                />
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              {filteredCases.length} case{filteredCases.length !== 1 ? 's' : ''} found
            </div>
          </div>
        </>
      )}

      {/* Collapsed State - Show only icon */}
      {isCollapsed && (
        <div className="flex flex-col items-center justify-center h-full">
          <MessageSquare className="h-8 w-8 text-gray-400 mb-2" />
          <div className="text-xs text-gray-400 text-center">
            {cases.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeftPanel;
