import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Initialize the browser service worker instance with our custom request intercept handlers
export const worker = setupWorker(...handlers);
