"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import { useCreateWorkspace } from "../api/use-create-workspace";
import { useRouter } from "next/navigation";

export const CreateWorkspaceModal = () => {
  const router = useRouter();
  const [open, setOpen] = useCreateWorkspaceModal();

  const { mutate } = useCreateWorkspace();

  const handleClose = () => {
    setOpen(false);
    //TODO: clear form
  };

  const handleSubmit = () => {
    mutate(
      {
        name: "Workspace 1",
      },
      {
        onSuccess: (data) => {
          // Redirect to the new workspace
          router.push(`/workspaces/${data}`);
        },
        onError: () => {
          // Show error toast
        },
        onSettled: () => {
          // Reset form
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a workspace</DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
          <Input
            name="name"
            value=""
            disabled={false}
            required
            autoFocus
            minLength={3}
            placeholder="Workspace name e.g. 'Work', 'Home', 'Personal'"
          />
          <div className="flex justify-end">
            <Button disabled={false}>Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
