import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AppLayout from "./components/AppLayout";
import Home from "./pages/Home";

import Auth from "./pages/Auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import RecipePage from "./pages/RecipePage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { Slide, ToastContainer } from "react-toastify";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoutes>
                <AppLayout />
              </ProtectedRoutes>
            }
          >
            <Route index element={<Navigate replace to="home" />} />
            <Route path="home" element={<Home />} />
            <Route path="recipe/:id" element={<RecipePage />} />
          </Route>
          <Route path="auth/:id" element={<Auth />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        style={{ width: "fit-content" }}
        transition={Slide}
      />
    </QueryClientProvider>
  );
}

export default App;
