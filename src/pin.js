import React, { PropTypes } from 'react';
import '../theme/pin.scss';

export default function Pin({ pinKey, name, image, active, startPoint, endPoint, onMouseEnter,
  onMouseLeave, onClick }) {
  const pin = [];
  if (active) {
    return (
      <g className="pin">
        {image &&
          <defs>
            <pattern id={`thumb${pinKey}`} width="1" height="1">
              <image xlinkHref={image} x="0" y="0" width="50" height="50" />
            </pattern>
          </defs>
        }
        <circle
          className="pin__thumb"
          cx={Math.round(endPoint[0])}
          cy={Math.round(endPoint[1])}
          r="25"
          style={{ fill: image ? `url(#thumb${pinKey})` : 'currentColor' }}
          {...{ onMouseLeave, onClick }}
        />
        <text
          className="pin__text"
          x={endPoint[0]}
          y={endPoint[1] + 25}
        >
          {name}
        </text>
      </g>
    );
  }
  return (
    <g>
      <line
        className="pin__line"
        x1={startPoint[0]}
        y1={startPoint[1]}
        x2={endPoint[0]}
        y2={endPoint[1]}
      />
      <circle
        className="pin__circle"
        cx={endPoint[0]}
        cy={endPoint[1]}
        r="5"
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
