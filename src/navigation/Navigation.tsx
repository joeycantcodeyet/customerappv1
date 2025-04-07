
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

const Navigation = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/store-selection" element={<StoreSelectionScreen />} />
          <Route path="/id-scanner" element={<IDScannerScreen />} />
          <Route path="/customer-search" element={<CustomerSearchScreen />} />
          <Route path="/customer-creation" element={<CustomerCreationScreen />} />
          <Route path="/customer-profile/:id" element={<CustomerProfileScreen />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
        <Toaster />
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Navigation;
