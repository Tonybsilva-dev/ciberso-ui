import * as React from 'react';
import type { SVGProps } from 'react';

export const Pause = React.forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg  width="24" height="24" viewBox="0 -960 960 960" ref={ref} {...props} role="img" aria-hidden="true"><path d="M520-200v-560h240v560zm-320 0v-560h240v560zm400-80h80v-400h-80zm-320 0h80v-400h-80zm0-400v400zm320 0v400z"/ fill="currentColor"></svg>
  )
);

Pause.displayName = 'Pause';
