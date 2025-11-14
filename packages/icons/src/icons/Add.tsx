import * as React from 'react';
import type { SVGProps } from 'react';

export const Add = React.forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg  width="24" height="24" viewBox="0 -960 960 960" ref={ref} {...props} role="img" aria-hidden="true"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80z"/ fill="currentColor"></svg>
  )
);

Add.displayName = 'Add';
