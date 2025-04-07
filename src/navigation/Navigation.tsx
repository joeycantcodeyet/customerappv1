
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from '../screens/LoginScreen';
import StoreSelectionScreen from '../screens/StoreSelectionScreen';
import IDScannerScreen from '../screens/IDScannerScreen';
import CustomerSearchScreen from '../screens/CustomerSearchScreen';
import CustomerCreationScreen from '../screens/CustomerCreationScreen';
import CustomerProfileScreen from '../screens/CustomerProfileScreen';
import { Toaster } from '@/components/ui/toaster';
import ErrorBoundary from '@/components/ErrorBoundary';
import MainNavbar from '@/components/MainNavbar';

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
              <AppLayout>
                <StoreSelectionScreen />
              </AppLayout>
            } 
          />
          <Route 
            path="/id-scanner" 
            element={
              <AppLayout>
                <IDScannerScreen />
              </AppLayout>
            } 
          />
          <Route 
            path="/customer-search" 
            element={
              <AppLayout>
                <CustomerSearchScreen />
              </AppLayout>
            } 
          />
          <Route 
            path="/customer-creation" 
            element={
              <AppLayout>
                <CustomerCreationScreen />
              </AppLayout>
            } 
          />
          <Route 
            path="/customer-profile/:id" 
            element={
              <AppLayout>
                <CustomerProfileScreen />
              </AppLayout>
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
