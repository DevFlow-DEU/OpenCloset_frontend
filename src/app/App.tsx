import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../api/queryClient';

interface Props {
  children: React.ReactNode;
}

export default function App({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
