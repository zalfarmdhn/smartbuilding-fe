import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { RouterProvider } from "react-router";
import routes from "./routes/index.tsx";
import { Suspense } from "react";
import LoadingLayout from "./layout/LoadingLayout.tsx";

createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<LoadingLayout />}>
    <RouterProvider router={routes} />
  </Suspense>
);
