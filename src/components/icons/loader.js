import React from 'react';

const IconLoader = () => (
  <svg id="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <title>Loader Logo</title>
    <g>
      <path
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M 50, 5
                  L 11, 27
                  L 11, 72
                  L 50, 95
                  L 89, 73
                  L 89, 28 z"
      />
    </g>
    {/* Book Icon */}
    <g transform="translate(30, 25)">
      <path
        fill="currentColor"
        d="M20 2C18.9 2 18 2.9 18 4V18C18 19.1 18.9 20 20 20H38C39.1 20 40 19.1 40 18V8L30 2H20Z
           M28 3L37 9H28V3Z
           M20 4H26V10H38V18H20V4Z
           M22 12V14H36V12H22Z
           M22 16V18H36V16H22Z"
        transform="scale(1.1)"
      />
    </g>
  </svg>
);

export default IconLoader;
