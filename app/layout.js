import './globals.css';

export const metadata = {
  title: 'Valentine Confession',
  description: 'A romantic Valentine\'s confession application',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-gradient-to-br from-rose-50 via-rose-100 to-rose-200 min-h-screen">
        {children}
      </body>
    </html>
  );
}
