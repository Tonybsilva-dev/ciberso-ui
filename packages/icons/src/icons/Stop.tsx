import * as React from 'react';
import type { SVGProps } from 'react';

export const Stop = React.forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg  width="24" height="24" viewBox="0 -960 960 960" ref={ref} {...props} role="img" aria-hidden="true"><path d="M320-640v320zm-80 400v-480h480v480zm80-80h320v-320H320z"/ fill="currentColor"></svg>
  )
);

Stop.displayName = 'Stop';
