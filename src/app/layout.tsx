import '../styles/globals.css';
import React from 'react';

export const metadata = {
  title: 'Speech Coach MVP',
  description: 'Privacy-first speech coaching for intelligible Global English.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen max-w-4xl mx-auto px-4 py-8">
          <header className="mb-8 flex items-center justify-between">
            <h1 className="text-2xl font-semibold">🗣️ Speech Coach</h1>
            <a href="/session" className="btn">Start a Session</a>
          </header>
          <main>{children}</main>
          <footer className="mt-12 text-sm text-gray-400">
            No login. No storage. Not medical advice. © {new Date().getFullYear()}
          </footer>
        </div>
      </body>
    </html>
  );
}
