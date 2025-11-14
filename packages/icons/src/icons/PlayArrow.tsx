import * as React from 'react';
import type { SVGProps } from 'react';

export const PlayArrow = React.forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg  width="24" height="24" viewBox="0 -960 960 960" ref={ref} {...props} role="img" aria-hidden="true"><path d="M320-200v-560l440 280zm80-146 210-134-210-134z"/ fill="currentColor"></svg>
  )
);

PlayArrow.displayName = 'PlayArrow';
