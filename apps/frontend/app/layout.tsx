import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { AuthProvider } from '@/components/providers/auth-provider';
import { Toaster } from '@/components/ui/toaster';
import { CustomCursor } from '@/components/ui/CustomCursor';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: 'REEDU | High-End Used Books Marketplace',
  description: 'The premium secondary marketplace for NEET, JEE, and competitive exams.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark scroll-smooth">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-[#0A0A0A] text-[#F5F5F5] antialiased overflow-x-hidden selection:bg-[#8A2BE2] selection:text-white`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <AuthProvider>
            <CustomCursor />
            <div className="relative min-h-screen flex flex-col bg-[#0A0A0A]">
              {/* Global Abstract Mesh Gradient Background */}
              <div className="fixed inset-0 z-[-1] pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[rgba(138,43,226,0.15)] to-transparent blur-[120px]" />
                <div className="absolute top-[40%] right-[-10%] w-[35%] h-[35%] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[rgba(0,240,255,0.08)] to-transparent blur-[120px]" />
              </div>
              {children}
            </div>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

