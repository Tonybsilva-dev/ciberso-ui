import * as React from 'react';
import type { SVGProps } from 'react';

export const ChevronLeft = React.forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg  width="24" height="24" viewBox="0 -960 960 960" ref={ref} {...props} role="img" aria-hidden="true"><path d="M560-240 320-480l240-240 56 56-184 184 184 184z"/></svg>
  )
);

ChevronLeft.displayName = 'ChevronLeft';
