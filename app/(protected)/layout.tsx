import MobileFrame from '@/components/app/MobileFrame';
import { AppStateProvider } from '@/components/providers/AppStateProvider';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppStateProvider>
      <MobileFrame>{children}</MobileFrame>
    </AppStateProvider>
  );
}