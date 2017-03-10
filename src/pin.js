import React, { PropTypes } from 'react';

export default function Pin({ pinKey, name, image, active, startPoint, endPoint, onMouseEnter, onMouseLeave, onClick }) {
  const pin = [];
  if (active) {
    return (
      <g>
        {image &&
          <defs>
            <pattern id={`thumb${pinKey}`} width="1" height="1">
              <image xlinkHref={image} x="0" y="0" width="50" height="50" />
            </pattern>
          </defs>
        }
        <circle
          cx={Math.round(endPoint[0])}
          cy={Math.round(endPoint[1])}
          r="25"
          style={{
            stroke: 'white',
            fill: image ? `url(#thumb${pinKey})` : 'currentColor',
            strokeWidth: '3',
            cursor: 'pointer',
          }}
          {...{ onMouseLeave, onClick }}
        />
        <text
          x={endPoint[0]}
          y={endPoint[1] + 25}
          style={{
            fill: 'currentColor',
            textAnchor: 'middle',
            fontSize: '.9rem',
            transform: 'translateY(.9rem)',
            textTransform: 'uppercase',
            letterSpacing: '2px',
          }}
        >
          {name}
        </text>
      </g>
    );
  }
  return (
    <g>
      <line
        x1={startPoint[0]}
        y1={startPoint[1]}
        x2={endPoint[0]}
        y2={endPoint[1]}
        style={{ stroke: 'currentColor' }}
      />
      <circle
        cx={endPoint[0]}
        cy={endPoint[1]}
        r="5"
        style={{ stroke: 'currentColor', fill: 'white' }}
        {...{ onMouseEnter }}
      />
    </g>
  );
  return pin;
}

Pin.propTypes = {
  pinKey: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  active: PropTypes.bool,
  startPoint: PropTypes.arrayOf(PropTypes.number).isRequired,
  endPoint: PropTypes.arrayOf(PropTypes.number).isRequired,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onClick: PropTypes.func,
};
