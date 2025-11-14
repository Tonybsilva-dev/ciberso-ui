import * as React from 'react';
import type { SVGProps } from 'react';

export const Menu = React.forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg  width="24" height="24" viewBox="0 -960 960 960" ref={ref} {...props} role="img" aria-hidden="true"><path d="M120-240v-80h720v80zm0-200v-80h720v80zm0-200v-80h720v80z"/ fill="currentColor"></svg>
  )
);

Menu.displayName = 'Menu';
