import * as React from 'react';
import type { SVGProps } from 'react';

export const ExpandMore = React.forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg  width="24" height="24" viewBox="0 -960 960 960" ref={ref} {...props} role="img" aria-hidden="true"><path d="M480-345 240-585l56-56 184 184 184-184 56 56z"/ fill="currentColor"></svg>
  )
);

ExpandMore.displayName = 'ExpandMore';
