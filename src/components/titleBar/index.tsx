import { useLanguageContext } from "@/contexts/I18N";
import { useSettings } from "@/hooks";
import TitleBarIcons from "./icons";
import TitleBarTrafficLights from "./traffic-lights";

const TitleBar = () => {
  const { t } = useLanguageContext();
  const { settings } = useSettings();

  const titleBarStyle = settings?.titleBarStyle;

  if (titleBarStyle === "none") return null;
  if (titleBarStyle === "native") return null;

  return (
    <div className="fixed top-0 z-[9999] flex items-center w-full h-8 border-b shadow-md bg-background border-muted">
      <div className="flex flex-row items-center justify-between w-full">
        {/* Title */}
        <div id="titlebar" className="flex items-center flex-1 h-full pl-3">
          <h1 className="text-lg font-semibold pointer-events-none select-none text-foreground">
            {t("falkor")}
          </h1>
        </div>
        <div className="flex gap-1 pr-3">
          {titleBarStyle === "icons" ? (
            <TitleBarIcons />
          ) : (
            <TitleBarTrafficLights />
          )}
        </div>
      </div>
    </div>
  );
};

export default TitleBar;