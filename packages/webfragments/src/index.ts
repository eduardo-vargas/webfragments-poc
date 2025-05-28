import { ReactNode, useEffect, useState } from 'react';

export interface WebFragment {
  id: string;
  content: ReactNode;
  dependencies?: string[];
  url?: string;  // URL where the fragment is deployed
}

export interface WebFragmentProps {
  fragment: WebFragment;
}

export interface RemoteWebFragment {
  id: string;
  url: string;
}

export interface WebFragmentHookResult {
  fragment: WebFragment | null;
  error: Error | null;
  loading: boolean;
}

export interface WebFragmentHookOptions {
  url?: string;
}

export function createWebFragment(
  id: string, 
  content: ReactNode, 
  dependencies: string[] = [],
  url?: string
): WebFragment {
  return {
    id,
    content,
    dependencies,
    url
  };
}

export function createRemoteWebFragment(id: string, url: string): RemoteWebFragment {
  return { id, url };
}

export function useWebFragment(fragmentId: string, options?: WebFragmentHookOptions): WebFragmentHookResult {
  const [fragment, setFragment] = useState<WebFragment | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!options?.url) {
      setFragment(null);
      setError(null);
      setLoading(false);
      return;
    }

    const loadFragment = async () => {
      try {
        setLoading(true);
        const response = await fetch(options.url!);
        if (!response.ok) {
          throw new Error(`Failed to load fragment: ${response.statusText}`);
        }
        
        // Here you would load the fragment's JS, CSS, and other assets
        // This is a simplified example
        const fragmentData = await response.json();
        setFragment(fragmentData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load fragment'));
      } finally {
        setLoading(false);
      }
    };

    loadFragment();
  }, [fragmentId, options?.url]);

  return { fragment, error, loading };
}

// Export local fragments
export { partyButtonFragment } from './fragments/party-button'; 