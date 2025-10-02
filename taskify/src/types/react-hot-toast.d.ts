declare module 'react-hot-toast' {
  import * as React from 'react'
  export interface ToastOptions {
    id?: string
  }
  export const Toaster: React.FC<{ position?: string }>
  export interface ToastApi {
    (message: string, options?: ToastOptions): string
    success(message: string, options?: ToastOptions): string
    error(message: string, options?: ToastOptions): string
    dismiss(id?: string): void
  }
  const toast: ToastApi
  export default toast
}



