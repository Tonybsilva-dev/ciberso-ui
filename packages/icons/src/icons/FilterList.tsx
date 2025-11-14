import * as React from 'react';
import type { SVGProps } from 'react';

export const FilterList = React.forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg  width="24" height="24" viewBox="0 -960 960 960" ref={ref} {...props} role="img" aria-hidden="true"><path d="M400-240v-80h160v80zM240-440v-80h480v80zM120-640v-80h720v80z"/></svg>
  )
);

FilterList.displayName = 'FilterList';
