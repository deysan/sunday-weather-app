import DetailsPage from './details';
import MainPage from './main';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

export const Routing: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/city/:cityId" element={<DetailsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
