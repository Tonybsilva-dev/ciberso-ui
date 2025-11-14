import * as React from 'react';
import type { SVGProps } from 'react';

export const ChevronRight = React.forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg  width="24" height="24" viewBox="0 -960 960 960" ref={ref} {...props} role="img" aria-hidden="true"><path d="M504-480 320-664l56-56 240 240-240 240-56-56z" fill="currentColor"/></svg>
  )
);

ChevronRight.displayName = 'ChevronRight';
