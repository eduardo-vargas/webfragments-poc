import React, { ReactNode, ComponentType } from 'react';
import { createRoot } from 'react-dom/client';

// Global registry for fragments
const fragmentRegistry = new Map<string, ComponentType<any>>();
let isInitialized = false;

// Create a promise that resolves when both initialization and registration are complete
let resolveInit: () => void;
const readyPromise = new Promise<void>((resolve) => {
  resolveInit = resolve;
});

// Track registration completion
let pendingRegistrations = new Set<string>();

export function createFragment<T = {}>(id: string, Component: ComponentType<T>): ComponentType<T> {
  fragmentRegistry.set(id, Component);
  return Component;
}

export function registerFragment(id: string, Component: ComponentType<any>): void {
  console.log(`[Registry] Registering fragment: ${id}`);
  fragmentRegistry.set(id, Component);
  pendingRegistrations.delete(id);
  
  // If all registrations are complete, resolve the promise
  if (isInitialized && pendingRegistrations.size === 0) {
    console.log('[Registry] All fragments registered, system ready');
    resolveInit();
  }
}

export function expectFragment(id: string): void {
  pendingRegistrations.add(id);
}

export function getFragment(id: string): ComponentType<any> | undefined {
  return fragmentRegistry.get(id);
}

// Web Fragment Custom Elements
export class WebFragment extends HTMLElement {
  private isInitialized = false;
  private root: ReturnType<typeof createRoot> | null = null;
  private fragmentId: string | null = null;

  constructor() {
    super();
    // Create a shadow root for isolation
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['fragment-id'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'fragment-id' && oldValue !== newValue) {
      this.fragmentId = newValue;
      if (this.isInitialized) {
        this.tryRender();
      }
    }
  }

  async connectedCallback() {
    if (!this.isInitialized) {
      this.isInitialized = true;
      this.fragmentId = this.getAttribute('fragment-id');
      
      if (this.fragmentId) {
        // Register this fragment as expected
        expectFragment(this.fragmentId);
        
        // Show loading state
        this.renderLoading();
        
        // Wait for initialization and registration
        await readyPromise;
        this.tryRender();
      }
    }
  }

  disconnectedCallback() {
    if (this.root) {
      this.root.unmount();
    }
  }

  private renderContent(Component: ComponentType<any> | ReactNode) {
    if (!this.root) {
      const container = document.createElement('div');
      container.id = `fragment-${this.fragmentId}`;
      this.shadowRoot?.appendChild(container);
      this.root = createRoot(container);
    }

    const element = React.createElement(
      React.StrictMode,
      null,
      React.isValidElement(Component) 
        ? Component 
        : typeof Component === 'function'
        ? React.createElement(Component)
        : Component
    );

    this.root.render(element);
  }

  private renderLoading() {
    const loadingSlot = this.querySelector('[slot="loading"]');
    if (loadingSlot) {
      this.renderContent(
        React.createElement(
          'div',
          { className: 'web-fragment-loading' },
          loadingSlot.textContent
        )
      );
    }
  }

  private renderError() {
    const errorSlot = this.querySelector('[slot="error"]');
    const errorMessage = errorSlot ? errorSlot.textContent : 'Failed to load fragment';
    this.renderContent(
      React.createElement(
        'div',
        { className: 'web-fragment-error' },
        errorMessage
      )
    );
  }

  private tryRender() {
    if (!this.fragmentId) {
      console.error('Web fragment is missing fragment-id attribute');
      return;
    }

    console.log(`[WebFragment] Rendering fragment: ${this.fragmentId}`);

    // Check if we have a local component registered
    const Component = getFragment(this.fragmentId);
    console.log(`[WebFragment] Found component for ${this.fragmentId}:`, !!Component);
    
    if (Component) {
      console.log(`[WebFragment] Rendering local component for ${this.fragmentId}`);
      this.renderContent(Component);
    } else {
      console.log(`[WebFragment] No component found for ${this.fragmentId}, showing error`);
      this.renderError();
    }
  }
}

export function initializeWebFragments() {
  if (!isInitialized) {
    if (!customElements.get('web-fragment')) {
      customElements.define('web-fragment', WebFragment);
    }
    isInitialized = true;
    
    // Only resolve if there are no pending registrations
    if (pendingRegistrations.size === 0) {
      console.log('[Registry] No fragments to wait for, system ready');
      resolveInit();
    }
  }
  return readyPromise;
} 