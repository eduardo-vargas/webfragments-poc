declare namespace JSX {
  interface IntrinsicElements {
    'web-fragment': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        'fragment-id'?: string;
        src?: string;
      },
      HTMLElement
    >;
  }
} 