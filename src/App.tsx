import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { useMemo } from "react";
import { ThemeProvider } from "./components/theme-provider";
import SplashScreen from "./features/splashscreen/components";
import { useAppStartup } from "./hooks/useAppStartup";
import { useThemes } from "./hooks/useThemes";
import { memoryHistory } from "./lib/history";
import { routeTree } from "./routeTree.gen";

// Create a new query client instance
const createQueryClient = () => {
  return new QueryClient();
};

// Create the router instance
const createAppRouter = (queryClient: QueryClient) => {
  return createRouter({
    routeTree,
    history: memoryHistory, // Use global memory history
    context: {
      queryClient,
    },
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
  });
};

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createAppRouter>;
  }
}

function App() {
  const { hasLoaded } = useAppStartup();

  // Initialize theming logic
  useThemes();

  // Memoize queryClient and router to avoid recreating them on each render
  const queryClient = useMemo(createQueryClient, []);
  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

  if (!hasLoaded) return <SplashScreen />;

  return (
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
