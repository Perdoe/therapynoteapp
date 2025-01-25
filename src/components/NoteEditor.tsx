import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface NoteEditorProps {
  patientId: string;
  patientName: string;
  onSave: (note: string) => void;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({
  patientId,
  patientName,
  onSave,
}) => {
  const [note, setNote] = React.useState("");
  const { toast } = useToast();

  const handleSave = () => {
    onSave(note);
    toast({
      title: "Note saved",
      description: "Your note has been saved successfully.",
    });
  };

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">{patientName}</h2>
          <p className="text-sm text-gray-500">
            {new Date().toLocaleDateString()}
          </p>
        </div>
        <Textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Enter your session notes here..."
          className="min-h-[400px] mb-4 resize-none"
        />
        <div className="flex justify-end">
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save Note
          </Button>
        </div>
      </div>
    </div>
  );
};