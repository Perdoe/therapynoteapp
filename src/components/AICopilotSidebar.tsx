import React from "react";
import { ChevronLeft, ChevronRight, Lightbulb } from "lucide-react";
import { Button } from "./ui/button";

interface AICopilotSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const AICopilotSidebar: React.FC<AICopilotSidebarProps> = ({
  isOpen,
  onToggle,
}) => {
  return (
    <div
      className={`fixed right-0 top-0 h-screen bg-white border-l border-gray-200 transition-all duration-300 ${
        isOpen ? "w-80" : "w-12"
      }`}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute -left-4 top-6 bg-white border shadow-sm"
        onClick={onToggle}
      >
        {isOpen ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>
      {isOpen && (
        <div className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Lightbulb className="h-5 w-5 text-blue-500" />
            <h2 className="font-semibold">AI Copilot</h2>
          </div>
          <div className="text-sm text-gray-600">
            <p>AI suggestions will appear here as you write your notes.</p>
            <p className="mt-2">
              The AI will help identify patterns and suggest relevant therapeutic
              approaches based on the patient's history.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};