import { PluginSetupJSONDisabled, SearchPluginResponse } from "@/@types";
import { invoke } from "@/lib";
import { usePluginsStore } from "@/stores/plugins";
import { useCallback, useEffect } from "react";

type InvokeReturn = {
  data: PluginSetupJSONDisabled[];
  success: boolean;
  message?: string;
};

const UsePlugins = () => {
  const { plugins, setPlugins } = usePluginsStore();

  const getPlugins = useCallback(
    async (wantDisabled: boolean = false) => {
      const list = await invoke<InvokeReturn, boolean>(
        "plugins:list",
        wantDisabled
      );
      if (list?.success) {
        setPlugins(list.data);
      } else {
        console.error(`Failed to load plugins: ${list?.message}`);
      }
      return list;
    },
    [setPlugins]
  );

  const searchAllPlugins = async (query: string) => {
    const searchResults = await invoke<SearchPluginResponse, string>(
      "plugins:use:search",
      query
    );

    if (!searchResults?.success) return [];

    return searchResults.data;
  };

  useEffect(() => {
    if (!getPlugins || plugins.length) return;
    getPlugins();
  }, [getPlugins, plugins]);

  return {
    plugins,
    getPlugins,
    searchAllPlugins,
  };
};

export default UsePlugins;