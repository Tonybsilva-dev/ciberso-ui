import * as React from 'react';
import type { SVGProps } from 'react';

export const Send = React.forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg  width="24" height="24" viewBox="0 -960 960 960" ref={ref} {...props} role="img" aria-hidden="true"><path d="M120-160v-640l760 320zm80-120 474-200-474-200v140l240 60-240 60zm0 0v-400z"/></svg>
  )
);

Send.displayName = 'Send';
