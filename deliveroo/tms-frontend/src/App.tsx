import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Layout from "@/components/layout/Layout";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Orders from "@/pages/orders/Orders";
import OrderDetails from "@/pages/orders/OrderDetails";
import NewOrderForm from "@/pages/orders/NewOrderForm";
import IncidentReportForm from "@/pages/Incident-new";
import CustomerClaimForm from "@/pages/Claim-new";
import Shipments from "@/pages/shipments/Shipments";
import ShipmentTracking from "@/pages/shipments/ShipmentTracking";
import Drivers from "@/pages/drivers/Drivers";
import DriverDetails from "@/pages/drivers/DriverDetails";
import Trucks from "@/pages/vehicles/Trucks";
import Payments from "@/pages/Payments";
import TrackFleet from "@/pages/vehicles/TruckFleet";
import Incidents from "@/pages/Incidents";
import Claims from "@/pages/Claims";
import Expenses from "@/pages/Expenses";
import ExpenseDetails from "@/pages/Expense-Details";
import Urgent from "@/pages/Urgent";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/orders" element={
              <ProtectedRoute>
                <Layout>
                  <Orders />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/orders/new" element={
              <ProtectedRoute>
                <Layout>
                  <NewOrderForm />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/orders/:id" element={
              <ProtectedRoute>
                <Layout>
                  <OrderDetails />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/shipments" element={
              <ProtectedRoute>
                <Layout>
                  <Shipments />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/shipments/:id/track" element={
              <ProtectedRoute>
                <Layout>
                  <ShipmentTracking />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/drivers" element={
              <ProtectedRoute>
                <Layout>
                  <Drivers />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/drivers/:id" element={
              <ProtectedRoute>
                <Layout>
                  <DriverDetails />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/trucks" element={
              <ProtectedRoute>
                <Layout>
                  <Trucks />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/claims/new" element={
              <ProtectedRoute>
                <Layout>
                  <CustomerClaimForm />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/incidents/new" element={
              <ProtectedRoute>
                <Layout>
                  <IncidentReportForm />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/expenses" element={
              <ProtectedRoute>
                <Layout>
                  <Expenses />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/expenses/:id" element={
              <ProtectedRoute>
                <Layout>
                  <ExpenseDetails />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/payments" element={
              <ProtectedRoute>
                <Layout>
                  <Payments />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/vehicle-fleet" element={
              <ProtectedRoute>
                <Layout>
                  <TrackFleet />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/incidents" element={
              <ProtectedRoute>
                <Layout>
                  <Incidents />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/claims" element={
              <ProtectedRoute>
                <Layout>
                  <Claims />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/urgent" element={
              <ProtectedRoute>
                <Layout>
                  <Urgent />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Layout>
                  <Profile />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
    {process.env.NODE_ENV === 'development' && (
      <ReactQueryDevtools initialIsOpen={false} />
    )}
  </QueryClientProvider>
);

export default App;