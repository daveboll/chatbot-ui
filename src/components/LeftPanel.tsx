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
}

const LeftPanel: React.FC<LeftPanelProps> = ({ 
  cases, 
  selectedCase, 
  onCaseSelect, 
  expandedAccordion, 
  onAccordionToggle 
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



  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-900 mb-4">Cases</h1>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search cases..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
    </div>
  );
};

export default LeftPanel;
