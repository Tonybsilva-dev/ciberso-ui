import * as React from 'react';
import type { SVGProps } from 'react';

export const Warning = React.forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg  width="24" height="24" viewBox="0 -960 960 960" ref={ref} {...props} role="img" aria-hidden="true"><path d="m40-120 440-760 440 760zm138-80h604L480-720zm302-40q17 0 28.5-11.5T520-280t-11.5-28.5T480-320t-28.5 11.5T440-280t11.5 28.5T480-240m-40-120h80v-200h-80zm40-100" fill="currentColor"/></svg>
  )
);

Warning.displayName = 'Warning';
