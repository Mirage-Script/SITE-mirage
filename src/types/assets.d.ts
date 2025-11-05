declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  import type { FunctionComponent, SVGProps } from 'react';
  const content: string;
  export default content;
  export const ReactComponent: FunctionComponent<SVGProps<SVGSVGElement>>;
}
