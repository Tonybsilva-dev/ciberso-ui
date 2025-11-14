import * as React from 'react';
import type { SVGProps } from 'react';

export const Check = React.forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg  width="24" height="24" viewBox="0 -960 960 960" ref={ref} {...props} role="img" aria-hidden="true"><path d="M382-240 154-468l57-57 171 171 367-367 57 57z" fill="currentColor"/></svg>
  )
);

Check.displayName = 'Check';
