import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { PostHogProvider } from '@posthog/react'
import './index.css'
import App from './App.jsx'

const POSTHOG_KEY = 'phc_UPMGge1KyhOREoRHqOlJSwsROf2ejRNWhE8nhaZG6N3'

// Only enable capturing if user has explicitly accepted cookies
const cookieConsent = localStorage.getItem('propair-cookie-consent')

const posthogOptions = {
  api_host: '/ingest',
  ui_host: 'https://us.i.posthog.com',
  person_profiles: 'identified_only',
  capture_pageview: true,
  capture_pageleave: true,
  autocapture: true,
  scroll_depth: true,
  capture_performance: true,
  opt_out_capturing_by_default: cookieConsent !== 'accepted',
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PostHogProvider apiKey={POSTHOG_KEY} options={posthogOptions}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </PostHogProvider>
  </StrictMode>,
)
