import { PluginId } from "@/@types";
import { PluginHandler } from "../../../handlers/plugins/plugin";
import { registerEvent } from "../utils/registerEvent";

const pluginHandler = new PluginHandler();

const disablePlugin = async (
  _event: Electron.IpcMainInvokeEvent,
  pluginId: PluginId
): Promise<{
  message: string;
  success: boolean;
}> => {
  try {
    const disabled = await pluginHandler.disable(pluginId);

    if (!disabled) {
      return {
        message: "Failed to disabled plugin",
        success: false,
      };
    }

    return {
      message: "Plugin disabled successfully",
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      message: (error as Error).message,
      success: false,
    };
  }
};

registerEvent("plugins:disable", disablePlugin);