import React, { Component } from 'react';
import { feature } from 'topojson-client';
import { geoOrthographic, geoPath } from 'd3-geo';
import world from './world.json';

// TODO load from json
const testPoints = [
  { lon: 139.76, lat: 35.68, date: 'April 2016', name: 'Japan', thumb: 'image.jpg' },
  { lon: 115.26, lat: -8.52, date: 'Oktober 2016', name: 'Bali', thumb: 'image.jpg' },
  { lon: 80.63, lat: 7.29, date: 'Februar 2017', name: 'Sri Lanka', thumb: 'image.jpg' },
  { lon: 103.86, lat: 13.36, date: 'September 2015', name: 'Kambodscha', thumb: 'image.jpg' },
  { lon: -9.14, lat: 38.74, date: 'Mai 2015', name: 'Lissabon', thumb: 'image.jpg' },
];

const width = 900;
const height = 700;
const radius1 = height / 2 - 40;
const radius2 = height / 2 - 10;
const land = feature(world, world.objects.land);
const lowSpeed = 0.1;

export default class Globe extends Component {
  constructor(props) {
    super(props);
    this.projection = geoOrthographic()
      .translate([width / 2, height / 2])
      .scale(radius1)
      .clipAngle(90);
    this.projectionOrbit = geoOrthographic()
      .translate([width / 2, height / 2])
      .scale(radius2)
      .clipAngle(90);
    this.dragging = false;
    this.savedLastX = 0;
    this.rotating = null;
    this.speed = lowSpeed;
    this.images = [];
    this.state = { rotation: 0, activePin: -1, images: {} };
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.rotate = this.rotate.bind(this);
  }

  componentDidMount() {
    if (!this.rotating) this.rotating = setTimeout(this.rotate, 50);
    // testPoints.map(({ thumb }, i) => {
    //   import(`../assets/${thumb}`)
    //     .then(image => {
    //       this.setState(({ images: prevImages }) => {
    //         const images = Object.assign({}, prevImages);
    //         images[i] = image;
    //         return { images };
    //       })
    //     })
    //     .catch(err => console.log(`Failed to load image "../assets/${thumb}"`, err));
    // });
  }

  onMouseDown(event) {
    this.dragging = true;
    this.savedLastX = event.clientX;
  }

  onMouseMove(event) {
    if (!this.dragging) return;
    const mod = (this.savedLastX - event.clientX) / 4;
    if (mod !== 0) this.speed = mod > 0 ? lowSpeed : -lowSpeed;
    this.savedLastX = event.clientX;
    this.setState(({ rotation }) => {
      return { rotation: rotation - mod };
    });
  }

  onMouseUp(event) {
    if (!this.dragging) return;
    this.dragging = false;
    if (this.rotating) clearTimeout(this.rotating);
    this.rotating = setTimeout(this.rotate, 1500);
  }

  onMouseLeave(event) {
    if (!this.dragging) return;
    this.dragging = false;
    if (this.rotating) clearTimeout(this.rotating);
    this.rotating = setTimeout(this.rotate, 1500);
  }

  rotate() {
    if (this.dragging || this.state.activePin !== -1) {
      this.rotating = null;
      return;
    }
    this.setState(({ rotation }) => {
      return { rotation: rotation - this.speed };
    });
    if (this.rotating) clearTimeout(this.rotating);
    this.rotating = setTimeout(this.rotate, 50);
  }

  render() {
    const { activePin, rotation, images } = this.state;
    this.projection.rotate([rotation, 0]);
    this.projectionOrbit.rotate([rotation, 0]);
    return (
      <div>
        <svg
          {...{ width, height }}
          onMouseDown={this.onMouseDown}
          onMouseMove={this.onMouseMove}
          onMouseUp={this.onMouseUp}
          onMouseLeave={this.onMouseLeave}
          style={{ strokeWidth: '1.5' }}
        >
          <path
            d={geoPath().projection(this.projection)(land)}
            style={{ fill: '#ccc', stroke: 'none' }}
          />
          <g>
            {testPoints.map(({ lon, lat, date, name }, id) => {
              // create path only to verify that the point is on the visible hemisphere
              if (!geoPath().projection(this.projection)({ type: "Point", coordinates: [lon, lat], id })) return null;
              const startPoint = this.projection([lon, lat]);
              const endPoint = this.projectionOrbit([lon, lat]);
              const active = id === activePin;
              const pin = [
                <line
                  key={`pinline${id}`}
                  x1={startPoint[0]}
                  y1={startPoint[1]}
                  x2={endPoint[0]}
                  y2={endPoint[1]}
                  style={{ stroke: 'red' }}
                />,
                <circle
                  cx={endPoint[0]}
                  cy={endPoint[1]}
                  r={active ? 10 : 5}
                  style={{ stroke: 'red', fill: 'white' }}
                  onMouseEnter={() => {
                    this.setState({ activePin: id });
                  }}
                  onMouseLeave={() => {
                    this.setState({ activePin: -1 });
                    if (this.rotating) clearTimeout(this.rotating);
                    this.rotating = setTimeout(this.rotate, 1500);
                  }}
                />,
              ];
              if (active) pin.push(
                <text
                  x={endPoint[0] + 15}
                  y={endPoint[1] + 5}
                  style={{ fill: 'black' }}
                >
                  {name} - {date}
                </text>
              );
              return pin;
            })}
          </g>
        </svg>
      </div>
    );
  }
}
