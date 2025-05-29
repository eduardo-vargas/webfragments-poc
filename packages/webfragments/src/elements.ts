import React, { ReactNode, ComponentType } from 'react';
import { createRoot } from 'react-dom/client';

// Global registry for fragments
const fragmentRegistry = new Map<string, ComponentType<any>>();

export function createFragment<T = {}>(id: string, Component: ComponentType<T>): ComponentType<T> {
  fragmentRegistry.set(id, Component);
  return Component;
}

export function registerFragment(id: string, Component: ComponentType<any>): void {
  fragmentRegistry.set(id, Component);
}

// Web Fragment Custom Elements
export class WebFragment extends HTMLElement {
  private isInitialized = false;
  private root: ReturnType<typeof createRoot> | null = null;

  constructor() {
    super();
  }

  connectedCallback() {
    if (!this.isInitialized) {
      this.isInitialized = true;
      this.render();
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
      container.id = `fragment-${this.getAttribute('fragment-id')}`;
      this.appendChild(container);
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

  private render() {
    const fragmentId = this.getAttribute('fragment-id');
    const src = this.getAttribute('src');

    if (!fragmentId) {
      console.error('Web fragment is missing fragment-id attribute');
      return;
    }

    // Check if we have a local component registered
    const Component = fragmentRegistry.get(fragmentId);
    if (Component) {
      this.renderContent(Component);
    } else if (src) {
      // Show loading state before fetching
      this.renderLoading();
      // Load remote fragment if no local component is found
      this.loadFragment(src);
    } else {
      // If no local component and no src, show error
      this.renderError();
    }
  }

  private async loadFragment(src: string) {
    try {
      const response = await fetch(src);
      if (!response.ok) {
        throw new Error(`Failed to load fragment: ${response.statusText}`);
      }
      
      // Assuming the remote fragment returns a JSON with component data
      const fragmentData = await response.json();
      // Here you would properly sanitize and transform the remote data
      // into a React component before rendering
      this.renderContent(
        React.createElement(
          'div',
          { className: 'web-fragment-remote' },
          // Transform fragmentData into proper React elements
          fragmentData.content
        )
      );
    } catch (error) {
      console.error('Error loading fragment:', error);
      this.renderError();
    }
  }
}

export function initializeWebFragments() {
  if (!customElements.get('web-fragment')) {
    customElements.define('web-fragment', WebFragment);
  }
} 