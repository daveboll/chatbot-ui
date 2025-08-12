import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, XCircle, Clock, FileText, Plus, Save, Wrench, Ban, Bug } from 'lucide-react';
import { Case, Chat, Fault, FaultStatus } from '../types';
import { mockFaults } from '../utils/mockData';
import { cn } from '../utils/cn';

interface RightPanelProps {
  selectedCase: Case | null;
  currentChat: Chat | null;
  onCaseResolved?: (caseId: string, status: 'open' | 'resolved') => void;
}

const RightPanel: React.FC<RightPanelProps> = ({ selectedCase, currentChat, onCaseResolved }) => {
  const [faults, setFaults] = useState<Fault[]>(mockFaults);
  const [showPassdownModal, setShowPassdownModal] = useState(false);
  const [passdownSummary, setPassdownSummary] = useState('');
  const [passdownActions, setPassdownActions] = useState('');
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [notesInput, setNotesInput] = useState('');

  const updateFaultStatus = (faultId: string, status: FaultStatus) => {
    setFaults(prev => prev.map(fault => {
      if (fault.id === faultId) {
        // If clicking the same status, revert to "none"
        const newStatus = fault.status === status ? 'none' : status;
        return { ...fault, status: newStatus };
      }
      return fault;
    }));
  };

  const updateFaultNotes = (faultId: string, notes: string) => {
    setFaults(prev => prev.map(fault =>
      fault.id === faultId ? { ...fault, notes } : fault
    ));
  };

  const getStatusIcon = (status: FaultStatus) => {
    switch (status) {
      case 'in-progress':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'ruled-out':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'root-cause':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: FaultStatus) => {
    switch (status) {
      case 'in-progress':
        return 'fault-status-in-progress';
      case 'ruled-out':
        return 'fault-status-ruled-out';
      case 'root-cause':
        return 'fault-status-root-cause';
      default:
        return 'bg-white border-gray-200';
    }
  };

  const getStatusButtonIcon = (status: FaultStatus) => {
    switch (status) {
      case 'in-progress':
        return <Clock className="h-3 w-3" />;
      case 'ruled-out':
        return <CheckCircle className="h-3 w-3" />;
      case 'root-cause':
        return <XCircle className="h-3 w-3" />;
      default:
        return <AlertTriangle className="h-3 w-3" />;
    }
  };

  const getStatusTooltip = (status: FaultStatus) => {
    switch (status) {
      case 'in-progress':
        return 'Mark as In Progress';
      case 'ruled-out':
        return 'Mark as Ruled Out';
      case 'root-cause':
        return 'Mark as Root Cause';
      default:
        return 'Set Status';
    }
  };

  const handleCreatePassdown = () => {
    setShowPassdownModal(true);
    // Auto-generate summary from chat
    if (currentChat) {
      const lastMessages = currentChat.messages.slice(-3);
      const summary = lastMessages
        .map(msg => msg.content)
        .join('. ');
      setPassdownSummary(summary);
    }
  };

  const handleSavePassdown = () => {
    // Here you would typically save the passdown to your backend
    console.log('Saving passdown:', { summary: passdownSummary, actions: passdownActions });
    setShowPassdownModal(false);
    setPassdownSummary('');
    setPassdownActions('');
  };

  const handleToggleCaseStatus = () => {
    if (selectedCase && onCaseResolved) {
      const newStatus = selectedCase.status === 'resolved' ? 'open' : 'resolved';
      const statusText = newStatus === 'resolved' ? 'resolved' : 'open';
      
      // Here you would typically update the case status in your backend
      console.log(`Marking case as ${statusText}:`, selectedCase.id);
      
      // Call the parent function to update the case status
      onCaseResolved(selectedCase.id, newStatus);
      
      alert(`Case marked as ${statusText}!`);
    }
  };

  if (!selectedCase) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p>Select a case to view faults</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Fault Management</h2>
        <p className="text-sm text-gray-600">Track and manage identified faults</p>
      </div>

      {/* Faults List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {faults.map((fault) => (
            <div
              key={fault.id}
              className={cn(
                "p-3 rounded-lg border",
                getStatusColor(fault.status)
              )}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(fault.status)}
                  <span className="text-sm font-medium text-gray-900">
                    {fault.category}
                  </span>
                </div>
              </div>
              
              <h3 className="text-sm font-medium text-gray-900 mb-1">
                {fault.symptom}
              </h3>
              
              <p className="text-xs text-gray-600 mb-3">
                {fault.description}
              </p>
              
              <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded mb-3">
                <div className="flex items-center justify-between mb-1">
                  <strong>Notes:</strong>
                  <button
                    onClick={() => {
                      setEditingNotes(fault.id);
                      setNotesInput(fault.notes || '');
                    }}
                    className="text-blue-600 hover:text-blue-800 text-xs"
                  >
                    {fault.notes ? 'Edit' : 'Add'} Notes
                  </button>
                </div>
                
                {editingNotes === fault.id ? (
                  <div>
                    <textarea
                      value={notesInput}
                      onChange={(e) => setNotesInput(e.target.value)}
                      className="w-full p-1 text-xs border border-gray-300 rounded resize-none"
                      rows={2}
                      placeholder="Add notes about this fault..."
                    />
                    <div className="flex space-x-1 mt-1">
                      <button
                        onClick={() => {
                          updateFaultNotes(fault.id, notesInput.trim());
                          setEditingNotes(null);
                          setNotesInput('');
                        }}
                        className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditingNotes(null);
                          setNotesInput('');
                        }}
                        className="text-xs bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>{fault.notes || ''}</div>
                )}
              </div>

              {/* Status buttons - moved to bottom to avoid blocking text */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div className="flex space-x-1">
                  <button
                    onClick={() => updateFaultStatus(fault.id, 'in-progress')}
                    className={cn(
                      "p-2 rounded border transition-colors",
                      fault.status === 'in-progress'
                        ? "bg-yellow-100 border-yellow-300 text-yellow-800"
                        : "bg-white border-gray-300 text-gray-600 hover:bg-yellow-50"
                    )}
                    title={getStatusTooltip('in-progress')}
                  >
                    {getStatusButtonIcon('in-progress')}
                  </button>
                  
                  <button
                    onClick={() => updateFaultStatus(fault.id, 'ruled-out')}
                    className={cn(
                      "p-2 rounded border transition-colors",
                      fault.status === 'ruled-out'
                        ? "bg-green-100 border-green-300 text-green-800"
                        : "bg-white border-gray-300 text-gray-600 hover:bg-green-50"
                    )}
                    title={getStatusTooltip('ruled-out')}
                  >
                    {getStatusButtonIcon('ruled-out')}
                  </button>
                  
                  <button
                    onClick={() => updateFaultStatus(fault.id, 'root-cause')}
                    className={cn(
                      "p-2 rounded border transition-colors",
                      fault.status === 'root-cause'
                        ? "bg-red-100 border-red-300 text-red-800"
                        : "bg-white border-gray-300 text-gray-600 hover:bg-red-50"
                    )}
                    title={getStatusTooltip('root-cause')}
                  >
                    {getStatusButtonIcon('root-cause')}
                  </button>
                </div>
                
                {/* Current Status Display */}
                <div className="text-xs text-gray-500">
                  {fault.status === 'in-progress' ? 'In Progress' : 
                   fault.status === 'ruled-out' ? 'Ruled Out' : 
                   fault.status === 'root-cause' ? 'Root Cause' : 
                   'Not Investigated'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-gray-200 space-y-3">
        <button
          onClick={handleCreatePassdown}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <FileText className="h-4 w-4" />
          <span>Create Passdown</span>
        </button>
        
        <button
          onClick={handleToggleCaseStatus}
          className={cn(
            "w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-colors",
            selectedCase?.status === 'resolved'
              ? "bg-yellow-600 text-white hover:bg-yellow-700"
              : "bg-green-600 text-white hover:bg-green-700"
          )}
        >
          {selectedCase?.status === 'resolved' ? (
            <Clock className="h-4 w-4" />
          ) : (
            <CheckCircle className="h-4 w-4" />
          )}
          <span>
            {selectedCase?.status === 'resolved' ? 'Mark Case as Open' : 'Mark Case as Resolved'}
          </span>
        </button>
      </div>

      {/* Passdown Modal */}
      {showPassdownModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create Passdown</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Summary
                </label>
                <textarea
                  value={passdownSummary}
                  onChange={(e) => setPassdownSummary(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Summarize the troubleshooting session..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Actions Taken
                </label>
                <textarea
                  value={passdownActions}
                  onChange={(e) => setPassdownActions(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="List the actions taken to resolve the issue..."
                />
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowPassdownModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavePassdown}
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Save Passdown
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RightPanel;
