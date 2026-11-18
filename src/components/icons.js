/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

const baseProps = {
  size: PropTypes.number,
  className: PropTypes.string,
};

const svgProps = ({ size = 24, className }) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  className,
  'aria-hidden': true,
  focusable: false,
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.9,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
});

export function SearchIcon({ size, className }) {
  return (
    <svg { ...svgProps({ size, className }) }>
      <circle cx="11" cy="11" r="7" />
      <line x1="20" y1="20" x2="16.2" y2="16.2" />
    </svg>
  );
}

export function UserIcon({ size, className }) {
  return (
    <svg { ...svgProps({ size, className }) }>
      <path d="M20 21v-1.5a4.5 4.5 0 0 0-4.5-4.5h-7A4.5 4.5 0 0 0 4 19.5V21" />
      <circle cx="12" cy="7.5" r="3.8" />
    </svg>
  );
}

export function ArrowLeftIcon({ size, className }) {
  return (
    <svg { ...svgProps({ size, className }) }>
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="11 18 5 12 11 6" />
    </svg>
  );
}

export function CloseIcon({ size, className }) {
  return (
    <svg { ...svgProps({ size, className }) }>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function CheckIcon({ size, className }) {
  return (
    <svg { ...svgProps({ size, className }) }>
      <polyline points="20 6.5 9.5 17 4 11.5" />
    </svg>
  );
}

export function ShareIcon({ size, className }) {
  return (
    <svg { ...svgProps({ size, className }) }>
      <circle cx="18" cy="5" r="2.7" />
      <circle cx="6" cy="12" r="2.7" />
      <circle cx="18" cy="19" r="2.7" />
      <line x1="8.4" y1="13.4" x2="15.6" y2="17.6" />
      <line x1="15.6" y1="6.4" x2="8.4" y2="10.6" />
    </svg>
  );
}

export function HeartIcon({ size, className, filled = false }) {
  return (
    <svg
      { ...svgProps({ size, className }) }
      fill={ filled ? 'currentColor' : 'none' }
    >
      <path d="M20.8 5.1a5.2 5.2 0 0 0-7.4 0L12 6.5l-1.4-1.4a5.2 5.2 0 1 0-7.4 7.4l1.4 1.4L12 21.2l7.4-7.3 1.4-1.4a5.2 5.2 0 0 0 0-7.4z" />
    </svg>
  );
}

HeartIcon.propTypes = { filled: PropTypes.bool };

export function MealIcon({ size, className }) {
  return (
    <svg { ...svgProps({ size, className }) }>
      <path d="M6 3v7a2 2 0 0 0 4 0V3" />
      <line x1="8" y1="12" x2="8" y2="21" />
      <path d="M17.5 3c-1.6 1.9-2.5 3.8-2.5 5.8 0 1.9 1.1 3.2 2.5 3.2s2.5-1.3 2.5-3.2c0-2-.9-3.9-2.5-5.8z" />
      <line x1="17.5" y1="12" x2="17.5" y2="21" />
    </svg>
  );
}

export function DrinkIcon({ size, className }) {
  return (
    <svg { ...svgProps({ size, className }) }>
      <path d="M3.5 4h17L12 13z" />
      <line x1="12" y1="13" x2="12" y2="20" />
      <line x1="8" y1="20.5" x2="16" y2="20.5" />
      <line x1="9.5" y1="7.5" x2="14.5" y2="7.5" />
    </svg>
  );
}

export function SparklesIcon({ size, className }) {
  return (
    <svg { ...svgProps({ size, className }) }>
      <path d="M11 3.5 12.8 8 17.3 9.8 12.8 11.6 11 16.1 9.2 11.6 4.7 9.8 9.2 8z" />
      <path d="m18 14.5.9 2.2 2.1.8-2.1.8-.9 2.2-.9-2.2-2.1-.8 2.1-.8z" />
    </svg>
  );
}

export function BadgeCheckIcon({ size, className }) {
  return (
    <svg { ...svgProps({ size, className }) }>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.2 12.4 2.6 2.6 5-5.2" />
    </svg>
  );
}

export function ClockIcon({ size, className }) {
  return (
    <svg { ...svgProps({ size, className }) }>
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7.2 12 12.3 15.4 14.2" />
    </svg>
  );
}

export function LogoMark({ size = 28, className }) {
  return (
    <svg
      width={ size }
      height={ size }
      viewBox="0 0 32 32"
      className={ className }
      aria-hidden="true"
      focusable="false"
    >
      <rect width="32" height="32" rx="9" fill="currentColor" />
      <path
        d="M16 5.5c3.4 3 5.4 5.9 5.4 8.9a5.4 5.4 0 0 1-10.8 0c0-1.3.4-2.6 1.3-3.9.4 1.4 1.3 2.3 2.4 2.3 0-2.8.6-5.1 1.7-7.3z"
        fill="#fff"
      />
      <circle cx="21.6" cy="21.8" r="2.1" fill="#7cc576" />
    </svg>
  );
}

LogoMark.propTypes = { size: PropTypes.number, className: PropTypes.string };

[SearchIcon, UserIcon, ArrowLeftIcon, CloseIcon, CheckIcon, ShareIcon, MealIcon,
  DrinkIcon, SparklesIcon, BadgeCheckIcon, ClockIcon].forEach((icon) => {
  icon.propTypes = { ...baseProps };
});
