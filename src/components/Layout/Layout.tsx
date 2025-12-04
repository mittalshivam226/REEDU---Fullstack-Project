import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { LoadingScreen } from '../Graphics/LoadingScreen';
import { useAuth } from '../../contexts/AuthContext';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { loading } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      {loading && <LoadingScreen />}
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
