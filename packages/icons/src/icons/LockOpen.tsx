import * as React from 'react';
import type { SVGProps } from 'react';

export const LockOpen = React.forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg  width="24" height="24" viewBox="0 -960 960 960" ref={ref} {...props} role="img" aria-hidden="true"><path d="M240-640h360v-80q0-50-35-85t-85-35-85 35-35 85h-80q0-83 58.5-141.5T480-920t141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640m0 480h480v-400H240zm240-120q33 0 56.5-23.5T560-360t-23.5-56.5T480-440t-56.5 23.5T400-360t23.5 56.5T480-280M240-160v-400z" fill="currentColor"/></svg>
  )
);

LockOpen.displayName = 'LockOpen';
