import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import DetailsPage from './details';
import MainPage from './main';

export const Routing: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/:cityId" element={<DetailsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
