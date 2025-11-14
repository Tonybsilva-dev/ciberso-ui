import * as React from 'react';
import type { SVGProps } from 'react';

export const NotificationsOff = React.forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg  width="24" height="24" viewBox="0 -960 960 960" ref={ref} {...props} role="img" aria-hidden="true"><path d="M160-200v-80h80v-280q0-33 8.5-65t25.5-61l60 60q-7 16-10.5 32.5T320-560v280h248L56-792l56-56 736 736-56 56-146-144zm560-154-80-80v-126q0-66-47-113t-113-47q-26 0-50 8t-44 24l-58-58q20-16 43-28t49-18v-28q0-25 17.5-42.5T480-880t42.5 17.5T540-820v28q80 20 130 84.5T720-560zM480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80m33-481"/ fill="currentColor"></svg>
  )
);

NotificationsOff.displayName = 'NotificationsOff';
