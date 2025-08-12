import React, { useState, useRef, useEffect } from 'react';
import { Send, ThumbsUp, ThumbsDown, Bot, User } from 'lucide-react';
import { Chat, ChatMessage, Case } from '../types';
import { cn } from '../utils/cn';

interface ChatPanelProps {
  chat: Chat | null;
  onChatUpdate: (chat: Chat) => void;
  selectedCase: Case | null;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ chat, onChatUpdate, selectedCase }) => {
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat?.messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !chat) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    };

    const updatedChat = {
      ...chat,
      messages: [...chat.messages, newMessage],
      updatedAt: new Date().toISOString()
    };

    onChatUpdate(updatedChat);
    setInputMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: 'Thank you for your message. I\'m processing your request and will provide a response shortly.',
        timestamp: new Date().toISOString(),
        options: ['Continue troubleshooting', 'Request more information', 'Mark as resolved']
      };

      const updatedChatWithResponse = {
        ...updatedChat,
        messages: [...updatedChat.messages, botResponse],
        updatedAt: new Date().toISOString()
      };

      onChatUpdate(updatedChatWithResponse);
    }, 1000);
  };

  const handleOptionSelect = (option: string) => {
    if (!chat) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: option,
      timestamp: new Date().toISOString()
    };

    const updatedChat = {
      ...chat,
      messages: [...chat.messages, userMessage],
      updatedAt: new Date().toISOString()
    };

    onChatUpdate(updatedChat);
  };

  const handleFeedback = (messageId: string, feedback: 'thumbs-up' | 'thumbs-down') => {
    if (!chat) return;

    const updatedMessages = chat.messages.map(message =>
      message.id === messageId ? { ...message, feedback } : message
    );

    const updatedChat = {
      ...chat,
      messages: updatedMessages,
      updatedAt: new Date().toISOString()
    };

    onChatUpdate(updatedChat);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!selectedCase) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <Bot className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p>Select a case to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{selectedCase.number}</h2>
            <p className="text-sm text-gray-600">{selectedCase.title}</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className={cn(
              "px-2 py-1 text-xs rounded-full",
              selectedCase.status === 'resolved'
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            )}>
              {selectedCase.status}
            </span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chat?.messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <Bot className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p>Start a conversation to get help with your case</p>
          </div>
        ) : (
          chat?.messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.type === 'user' ? "justify-end" : "justify-start"
              )}
            >
              <div className="flex items-start space-x-2 max-w-xs lg:max-w-md">
                {message.type === 'bot' && (
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary-600" />
                  </div>
                )}
                
                <div className="flex flex-col">
                  <div
                    className={cn(
                      "chat-bubble",
                      message.type === 'user' ? "chat-bubble-user" : "chat-bubble-bot"
                    )}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                  
                  {/* Options for bot messages */}
                  {message.type === 'bot' && message.options && (
                    <div className="mt-2 space-y-1">
                      {message.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleOptionSelect(option)}
                          className="chat-bubble-option text-sm text-left w-full"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {/* Feedback for bot messages */}
                  {message.type === 'bot' && (
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => handleFeedback(message.id, 'thumbs-up')}
                          className={cn(
                            "p-1 rounded hover:bg-gray-100 transition-colors",
                            message.feedback === 'thumbs-up' ? "text-green-600" : "text-gray-400"
                          )}
                        >
                          <ThumbsUp className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => handleFeedback(message.id, 'thumbs-down')}
                          className={cn(
                            "p-1 rounded hover:bg-gray-100 transition-colors",
                            message.feedback === 'thumbs-down' ? "text-red-600" : "text-gray-400"
                          )}
                        >
                          <ThumbsDown className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* Timestamp for user messages */}
                  {message.type === 'user' && (
                    <div className="flex items-center justify-end mt-1">
                      <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
                      <div className="flex-shrink-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center ml-2">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
