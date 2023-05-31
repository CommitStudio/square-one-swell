import { toast } from 'react-toastify';

export const notifySuccess = (message: string) =>
  toast.success(message, {
    autoClose: 1000
  });

export const notifyFailure = (message: string) =>
  toast.error(message, {
    autoClose: 1000
  });
