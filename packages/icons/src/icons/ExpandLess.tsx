import * as React from 'react';
import type { SVGProps } from 'react';

export const ExpandLess = React.forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg  width="24" height="24" viewBox="0 -960 960 960" ref={ref} {...props} role="img" aria-hidden="true"><path d="m296-345-56-56 240-240 240 240-56 56-184-184z"/></svg>
  )
);

ExpandLess.displayName = 'ExpandLess';
