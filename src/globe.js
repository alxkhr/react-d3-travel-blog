import React, { Component } from 'react';
import { feature } from 'topojson-client';
import { geoOrthographic, geoPath } from 'd3';
import world from './world.json';

// TODO load from json
const testPoints = [
  { lon: 139.76, lat: 35.68, date: 'April 2016', name: 'Japan' },
  { lon: 115.19, lat: -8.41, date: 'Oktober 2016', name: 'Bali' },
  { lon: 80.63, lat: 7.29, date: 'Februar 2017', name: 'Sri Lanka' },
  { lon: 103.86, lat: 13.36, date: 'September 2015', name: 'Kambodscha' },
  { lon: -9.14, lat: 38.74, date: 'Mai 2015', name: 'Lissabon' },
];

const width = 900;
const height = 700;
const radius1 = height / 2 - 40;
const radius2 = height / 2 - 10;
const land = feature(world, world.objects.land);

// TODO make class properties, so another globe can be rendered (instances...)
const projection = geoOrthographic()
  .translate([width / 2, height / 2])
  .scale(radius1)
  .clipAngle(90);
const projectionOrbit = geoOrthographic()
  .translate([width / 2, height / 2])
  .scale(radius2)
  .clipAngle(90);
let rotating = false;
let savedLastX = 0;

function onMouseDown(event) {
  rotating = true;
  savedLastX = event.clientX;
}

function onMouseMove(event) {
  if (!rotating) return;
  const lastX = savedLastX;
  const newX = event.clientX;
  this.setState(({ rotation }) => {
    return { rotation: rotation - ((lastX - newX) / 4)};
  });
  savedLastX = newX;
}

function onMouseUp(event) {
  rotating = false;
}

function onMouseLeave(event) {
  rotating = false;
}

export default class Globe extends Component {
  constructor(props) {
    super(props);
    this.state = { rotation: 0, activePin: -1 };
    onMouseMove = onMouseMove.bind(this);
  }

  render() {
    const { activePin, rotation } = this.state;
    projection.rotate([rotation, 0]);
    projectionOrbit.rotate([rotation, 0]);
    return (
      <div>
        <svg {...{ width, height, onMouseDown, onMouseMove, onMouseUp, onMouseLeave }} style={{ strokeWidth: '1.5' }}>
          <path d={geoPath().projection(projection)(land)} style={{ fill: '#ccc', stroke: '#cfcfcf' }} />
          <g>
            {testPoints.map(({ lon, lat, date, name }, id) => {
              // create path only to verify that the point is on the visible hemisphere
              if (!geoPath().projection(projection)({ type: "Point", coordinates: [lon, lat], id })) return null;
              const startPoint = projection([lon, lat]);
              const endPoint = projectionOrbit([lon, lat]);
              const active = id === activePin;
              const pin = [
                <line key={`pinline${id}`} x1={startPoint[0]} y1={startPoint[1]} x2={endPoint[0]} y2={endPoint[1]} style={{ stroke: 'red' }} />,
                <circle cx={endPoint[0]} cy={endPoint[1]} r={active ? 10 : 5} style={{ stroke: 'red', fill: 'white' }} onMouseEnter={() => this.setState({ activePin: id })} onMouseLeave={() => this.setState({ activePin: -1 })} />,
              ];
              if (active) pin.push(<text x={endPoint[0] + 15} y={endPoint[1]} fill="black">{name} - {date}</text>);
              return pin;
              // return <path key={id} d={path} style={{ fill: 'black' }} />
            })}
          </g>
        </svg>
      </div>
    );
  }
}
