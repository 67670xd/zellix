import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Auth | Zellix',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
