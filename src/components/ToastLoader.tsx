'use client';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ToastLoader() {
  return (
    <ToastContainer
      position="top-right"
      hideProgressBar
      newestOnTop
      draggable
      closeOnClick
      pauseOnHover
      theme="light"
    />
  );
}
