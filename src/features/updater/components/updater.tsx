import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useUpdater } from "@/hooks/useUpdater";
import { useEffect, useState } from "react";

const Updater = () => {
  const { updateAvailable, installUpdate, progress } = useUpdater();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!updateAvailable) return;
    setOpen(true);
  }, [updateAvailable]);

  useEffect(() => {
    window.ipcRenderer.on("updater:error", (_, error) => {
      if (!error) window.ipcRenderer.removeAllListeners("updater:error");
      console.error("Error updating app: ", error);
    });
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Available</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2 py-1">
          <p className="text-sm text-muted-foreground">
            A new version of falkor is available. Would you like to install it
            now?
          </p>

          {progress !== undefined && progress > 0 && (
            <div className="flex items-center gap-2">
              <Progress value={progress} />
            </div>
          )}
        </div>
        <DialogFooter>
          <DialogClose>
            <Button variant={"destructive"}>Later</Button>
          </DialogClose>
          <Button
            variant={"secondary"}
            onClick={installUpdate}
            disabled={!!progress}
          >
            Update Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Updater;