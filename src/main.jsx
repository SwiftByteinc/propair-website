import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { PostHogProvider } from '@posthog/react'
import './index.css'
import App from './App.jsx'

const posthogOptions = {
  api_host: '/ingest',
  ui_host: 'https://us.i.posthog.com',
  person_profiles: 'always',
  capture_pageview: true,
  capture_pageleave: true,
  autocapture: true,
  scroll_depth: true,
  capture_performance: true,
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PostHogProvider apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY} options={posthogOptions}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </PostHogProvider>
  </StrictMode>,
)
