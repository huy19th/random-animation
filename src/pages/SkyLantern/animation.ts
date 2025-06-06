import {EllipseConfig} from 'konva/lib/shapes/Ellipse';
import {Color} from '../../common/constants';
import {randBetween} from '../../common/utils';

export class Lantern {
	static shape = [-40, 0, -25, 60, 25, 60, 40, 0, 30, -20, -30, -20, -40, 0];

	static color = Color.Amber[500];

	static candleLight: EllipseConfig = {
		x: 0,
		y: 60,
		radiusX: 10,
		radiusY: 2.5,
		fill: 'white',
	};

	static bottom: EllipseConfig = {
		x: 0,
		y: 60,
		radiusX: 25,
		radiusY: 5,
		fill: Color.Amber[300],
	};

	static glow: EllipseConfig[] = new Array(15).fill(null).map((_, i) => {
		const r = i * 5;
		return {
			x: 0,
			y: 45 - r / 5,
			radiusX: r / 2,
			radiusY: (r * 1.2) / 2,
			fill: `rgba(255,240,145,${(80 - r) / 100})`,
		};
	});

	static light = Color.Amber[300];

	static noise = (x: number) => (Math.sin(x) + 1) / 2;

	constructor(
		public x = randBetween(0, window.innerWidth - 100),
		public y = randBetween(window.innerHeight, window.innerHeight * 2),
		public xoff = randBetween(0, 10),
		public yoff = randBetween(0, 10),
	) {}

	float() {
		this.xoff += 0.1;
		this.yoff += 0.1;

		if (this.x > 0 && this.y > -200) {
			this.x += Lantern.noise(this.xoff) / 2;
			this.y -= Lantern.noise(this.yoff) * 2;
		} else {
			this.x = randBetween(0, window.innerWidth * 0.75);
			this.y = window.innerHeight + 100;
		}
	}

	get rotation() {
		return (Math.sin(this.xoff / 10) / 10) * (180 / Math.PI);
	}
}
