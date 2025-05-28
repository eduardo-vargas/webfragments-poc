declare module '@webfragments/core' {
  import { ReactNode } from 'react';

  export interface WebFragment {
    id: string;
    content: ReactNode;
    dependencies?: string[];
    url?: string;
  }

  export const partyButtonFragment: WebFragment;
}

declare module '@webfragments/core/elements' {
  import { ReactNode } from 'react';
  
  export function initializeWebFragments(): void;
  export function registerFragment(id: string, component: ReactNode): void;
} 