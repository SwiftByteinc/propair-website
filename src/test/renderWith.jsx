import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from '../context/LanguageContext';

/**
 * Custom render that wraps components with all required providers.
 * Use this instead of @testing-library/react's render in tests.
 */
export function renderWith(ui, { route = '/', ...options } = {}) {
  function Wrapper({ children }) {
    return (
      <LanguageProvider>
        <MemoryRouter initialEntries={[route]}>
          <HelmetProvider>
            {children}
          </HelmetProvider>
        </MemoryRouter>
      </LanguageProvider>
    );
  }

  return render(ui, { wrapper: Wrapper, ...options });
}
