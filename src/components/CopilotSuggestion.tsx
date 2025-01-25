import React from "react";
import { Lightbulb } from "lucide-react";

interface CopilotSuggestionProps {
  suggestion: string;
}

export const CopilotSuggestion: React.FC<CopilotSuggestionProps> = ({
  suggestion,
}) => {
  return (
    <div className="fixed bottom-6 right-6 max-w-sm bg-white rounded-lg shadow-lg border border-gray-200 p-4 animate-fade-in">
      <div className="flex items-start gap-3">
        <div className="mt-1">
          <Lightbulb className="h-5 w-5 text-accent" />
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-900">AI Suggestion</h4>
          <p className="text-sm text-gray-600 mt-1">{suggestion}</p>
        </div>
      </div>
    </div>
  );
};