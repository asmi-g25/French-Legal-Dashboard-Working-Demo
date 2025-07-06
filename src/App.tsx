
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Cases from "./pages/Cases";
import Clients from "./pages/Clients";
import Documents from "./pages/Documents";
import Calendar from "./pages/Calendar";
import Billing from "./pages/Billing";
import Communications from "./pages/Communications";
import Contacts from "./pages/Contacts";
import Subscription from "./pages/Subscription";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
            <Route path="/subscription" element={<ProtectedRoute><Subscription /></ProtectedRoute>} />
            <Route path="/cases" element={<ProtectedRoute requireSubscription><Cases /></ProtectedRoute>} />
            <Route path="/clients" element={<ProtectedRoute requireSubscription><Clients /></ProtectedRoute>} />
            <Route path="/documents" element={<ProtectedRoute requireSubscription><Documents /></ProtectedRoute>} />
            <Route path="/calendar" element={<ProtectedRoute requireSubscription><Calendar /></ProtectedRoute>} />
            <Route path="/billing" element={<ProtectedRoute requireSubscription><Billing /></ProtectedRoute>} />
            <Route path="/communications" element={<ProtectedRoute requireSubscription><Communications /></ProtectedRoute>} />
            <Route path="/contacts" element={<ProtectedRoute requireSubscription><Contacts /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
