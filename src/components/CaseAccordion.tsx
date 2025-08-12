import React, { useState } from 'react';
import { ChevronDown, Clock, CheckCircle } from 'lucide-react';
import { Case } from '../types';
import { cn } from '../utils/cn';

interface CaseAccordionProps {
  title: string;
  cases: Case[];
  status: 'open' | 'resolved';
  selectedCase: Case | null;
  onCaseSelect: (caseItem: Case) => void;
  isExpanded: boolean;
  onToggle: (status: 'open' | 'resolved' | null) => void;
}

const CaseAccordion: React.FC<CaseAccordionProps> = ({ 
  title, 
  cases, 
  status, 
  selectedCase, 
  onCaseSelect,
  isExpanded,
  onToggle
}) => {

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = () => {
    return status === 'open' ? (
      <Clock className="h-4 w-4 text-yellow-500" />
    ) : (
      <CheckCircle className="h-4 w-4 text-green-500" />
    );
  };

  const getStatusBadgeClass = () => {
    return status === 'open' 
      ? "bg-yellow-100 text-yellow-800" 
      : "bg-green-100 text-green-800";
  };

  return (
    <div className="border-b border-gray-200">
      <button 
        className="w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
        onClick={() => onToggle(status)}
      >
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <span className="font-medium text-gray-900">{title}</span>
          <span className={cn("text-xs px-2 py-1 rounded-full", getStatusBadgeClass())}>
            {cases.length}
          </span>
        </div>
        <ChevronDown 
          className={cn(
            "h-4 w-4 text-gray-500 transform transition-transform",
            isExpanded && "rotate-180"
          )} 
        />
      </button>
      
      {isExpanded && (
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 300px)' }}>
          {cases.map((caseItem) => (
            <div key={caseItem.id} className="p-2">
              <div
                className={cn(
                  "p-3 rounded-lg cursor-pointer transition-colors mb-2 border",
                  selectedCase?.id === caseItem.id
                    ? "bg-blue-50 border-blue-200"
                    : "hover:bg-gray-50 border-transparent"
                )}
                onClick={() => onCaseSelect(caseItem)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">
                      {caseItem.number}
                    </span>
                    {getStatusIcon()}
                  </div>
                  <span className={cn("text-xs px-2 py-1 rounded-full", getStatusBadgeClass())}>
                    {caseItem.status}
                  </span>
                </div>
                
                <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                  {caseItem.title}
                </h3>
                
                <div className="flex items-center text-xs text-gray-500">
                  <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>Updated {formatDate(caseItem.updatedAt)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CaseAccordion;
