import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/css/styles.css";
import { ToothProvider } from "@/context/tooth-context.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { routes } from "@/routes";
import { Toaster } from "./components/ui/toaster";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToothProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes} />
        <Toaster />
      </QueryClientProvider>
    </ToothProvider>
  </StrictMode>
);
