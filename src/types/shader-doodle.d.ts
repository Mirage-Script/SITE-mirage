declare module 'shader-doodle';

declare namespace JSX {
  interface IntrinsicElements {
    'shader-doodle': import('react').DetailedHTMLProps<
      import('react').HTMLAttributes<HTMLElement>,
      HTMLElement
    > & { class?: string };
  }
}
