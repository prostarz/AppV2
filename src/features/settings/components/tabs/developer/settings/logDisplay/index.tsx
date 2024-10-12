import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useLanguageContext } from "@/contexts/I18N";
import { useState } from "react";
import LogWindow from "./logWindow";

const LogDisplay = () => {
  const [enabled, setEnabled] = useState(false);
  const { t } = useLanguageContext();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center space-x-2">
        <Switch
          id="enable-dev-console"
          onCheckedChange={setEnabled}
          checked={enabled}
        />

        <Label htmlFor="enable-dev-console">
          {t("Settings.developer_enable_console.title")}
        </Label>
      </div>

      <LogWindow enabled={enabled} />
    </div>
  );
};

export default LogDisplay;