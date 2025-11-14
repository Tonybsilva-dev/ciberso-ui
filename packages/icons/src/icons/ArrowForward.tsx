import * as React from 'react';
import type { SVGProps } from 'react';

export const ArrowForward = React.forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg  width="24" height="24" viewBox="0 -960 960 960" ref={ref} {...props} role="img" aria-hidden="true"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56z"/ fill="currentColor"></svg>
  )
);

ArrowForward.displayName = 'ArrowForward';
