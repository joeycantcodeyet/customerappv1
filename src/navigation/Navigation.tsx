
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginScreen from '../screens/LoginScreen';
import StoreSelectionScreen from '../screens/StoreSelectionScreen';
import IDScannerScreen from '../screens/IDScannerScreen';
import CustomerSearchScreen from '../screens/CustomerSearchScreen';
import CustomerCreationScreen from '../screens/CustomerCreationScreen';
import CustomerProfileScreen from '../screens/CustomerProfileScreen';
import { Toaster } from '@/components/ui/toaster';
import ErrorBoundary from '@/components/ErrorBoundary';
import MainNavbar from '@/components/MainNavbar';
import { isAuthenticated } from '@/api/treezApi';

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);
  
  return isAuthenticated() ? <>{children}</> : null;
};

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <MainNavbar />
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
};

const Navigation = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route 
            path="/store-selection" 
            element={
              <ProtectedRoute>
                <AppLayout>
                  <StoreSelectionScreen />
                </AppLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/id-scanner" 
            element={
              <ProtectedRoute>
                <AppLayout>
                  <IDScannerScreen />
                </AppLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/customer-search" 
            element={
              <ProtectedRoute>
                <AppLayout>
                  <CustomerSearchScreen />
                </AppLayout>
              </ProtectedRoute>
            } 
          />
          {/* Customer creation screen has its own header, so it doesn't need AppLayout */}
          <Route 
            path="/customer-creation" 
            element={
              <ProtectedRoute>
                <CustomerCreationScreen />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/customer-profile/:id" 
            element={
              <ProtectedRoute>
                <AppLayout>
                  <CustomerProfileScreen />
                </AppLayout>
              </ProtectedRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
        <Toaster />
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Navigation;
