import { ReactNode } from 'react';

export interface WebFragment {
  id: string;
  content: ReactNode;
  dependencies?: string[];
  url?: string;  // URL where the fragment is deployed
}

export interface RemoteWebFragment {
  id: string;
  url: string;
} 