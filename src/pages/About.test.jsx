import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import About from './About';
import { LanguageProvider } from '../context/LanguageContext';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    section: ({ children, ...props }) => <section {...props}>{children}</section>,
  },
  useInView: () => true,
}));

function renderAbout() {
  return render(
    <HelmetProvider>
      <LanguageProvider><MemoryRouter>
        <About />
      </MemoryRouter></LanguageProvider>
    </HelmetProvider>
  );
}

describe('About', () => {
  it('renders hero heading', () => {
    renderAbout();
    expect(screen.getByText(/En tant qu'entrepreneur/)).toBeInTheDocument();
  });

  it('renders Nicolas Lepage name', () => {
    renderAbout();
    expect(screen.getAllByText('Nicolas Lepage').length).toBeGreaterThanOrEqual(1);
  });

  it('mentions Magog', () => {
    renderAbout();
    expect(screen.getByText('Initiative locale de Magog')).toBeInTheDocument();
  });

  it('renders quote', () => {
    renderAbout();
    expect(screen.getByText(/bâti ProPair parce que personne ne le faisait/)).toBeInTheDocument();
  });

  it('renders founder attribution', () => {
    renderAbout();
    expect(screen.getByText('Fondateur de ProPair')).toBeInTheDocument();
  });

  it('renders 3 timeline items', () => {
    renderAbout();
    expect(screen.getByText('Le Déclic')).toBeInTheDocument();
    expect(screen.getByText('Le Sacrifice')).toBeInTheDocument();
    expect(screen.getByText('La Mission')).toBeInTheDocument();
  });

  it('renders timeline titles', () => {
    renderAbout();
    expect(screen.getByText('Une simple publication Facebook')).toBeInTheDocument();
    expect(screen.getByText('Apprendre et bâtir')).toBeInTheDocument();
    expect(screen.getByText('Pour ma communauté')).toBeInTheDocument();
  });

  it('renders 4 values', () => {
    renderAbout();
    expect(screen.getByText('Sauver du temps')).toBeInTheDocument();
    expect(screen.getByText('Faits pour le terrain')).toBeInTheDocument();
    expect(screen.getByText('Ancré à Magog')).toBeInTheDocument();
    expect(screen.getByText('Zéro commission')).toBeInTheDocument();
  });

  it('renders section headings', () => {
    renderAbout();
    expect(screen.getByText("L'histoire d'une obsession")).toBeInTheDocument();
    expect(screen.getByText("L'ADN de ProPair")).toBeInTheDocument();
  });

  it('renders stats labels', () => {
    renderAbout();
    expect(screen.getByText("Pour l'entrepreneur")).toBeInTheDocument();
    expect(screen.getByText('Frais cachés')).toBeInTheDocument();
    expect(screen.getByText('Point de départ')).toBeInTheDocument();
    expect(screen.getByText('Vision commune')).toBeInTheDocument();
  });

  it('renders CTA links', () => {
    renderAbout();
    const signupLink = screen.getByText('Créer mon compte').closest('a');
    expect(signupLink).toHaveAttribute('href', '/login?mode=signup');

    const pricingLink = screen.getByText('Voir comment ça marche').closest('a');
    expect(pricingLink).toHaveAttribute('href', '/pricing');
  });

  it('renders CTA heading', () => {
    renderAbout();
    expect(screen.getByText("Utilisez l'outil que j'ai créé pour nous.")).toBeInTheDocument();
  });

  it('renders stats values', () => {
    renderAbout();
    expect(screen.getByText('100%')).toBeInTheDocument();
    expect(screen.getByText('0$')).toBeInTheDocument();
    expect(screen.getAllByText('Magog').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Vision commune')).toBeInTheDocument();
  });

  it('renders hero subtitle about Magog', () => {
    renderAbout();
    expect(screen.getByText(/grandi ici, à Magog/)).toBeInTheDocument();
  });

  it('renders timeline descriptions', () => {
    renderAbout();
    expect(screen.getByText(/massothérapeute sur les réseaux sociaux/)).toBeInTheDocument();
  });

  it('renders value descriptions', () => {
    renderAbout();
    expect(screen.getByText(/connectent le besoin à la compétence/)).toBeInTheDocument();
  });

  it('signup link points to login with signup mode', () => {
    renderAbout();
    const link = screen.getByText('Créer mon compte').closest('a');
    expect(link).toHaveAttribute('href', '/login?mode=signup');
  });
});
