import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface AddPatientDialogProps {
  onAddPatient: (patient: { name: string; id: string }) => void;
}

export const AddPatientDialog: React.FC<AddPatientDialogProps> = ({
  onAddPatient,
}) => {
  const [name, setName] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      const newPatient = {
        id: Date.now().toString(),
        name: name.trim(),
      };
      onAddPatient(newPatient);
      setName("");
      setOpen(false);
      toast({
        title: "Patient added",
        description: `${name} has been added to your patient list.`,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full mb-4">
          <Plus className="h-4 w-4 mr-2" />
          Add New Patient
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Patient</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Patient name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            Add Patient
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};