import React from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { QueryProvider } from './providers/QueryProvider';
import { SmoothScrollProvider } from './providers/SmoothScrollProvider';
import { ThemeProvider } from './providers/ThemeProvider';

// Polyfill for requestAnimationFrame and cancelAnimationFrame (some libraries need these in certain contexts)
if (typeof window !== 'undefined') {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (cb: FrameRequestCallback) => setTimeout(cb, 16) as unknown as number;
  }
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = (id: number) => clearTimeout(id);
  }
}

import './index.css';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root container missing in index.html');
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <QueryProvider>
        <ThemeProvider>
          <BrowserRouter>
            <SmoothScrollProvider>
              <App />
            </SmoothScrollProvider>
          </BrowserRouter>
        </ThemeProvider>
      </QueryProvider>
    </HelmetProvider>
  </React.StrictMode>
);
