import { useState, useEffect } from 'react';
import { WebFragment } from '../types';

export interface WebFragmentHookOptions {
  url?: string;
}

export interface WebFragmentHookResult {
  fragment: WebFragment | null;
  error: Error | null;
  loading: boolean;
}

/**
 * Hook to load and manage web fragments dynamically
 * @param fragmentId - The ID of the fragment to load
 * @param options - Optional configuration for fragment loading
 * @returns Object containing fragment data, loading state, and any errors
 */
export function useWebFragment(
  fragmentId: string, 
  options?: WebFragmentHookOptions
): WebFragmentHookResult {
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