import {useEffect, useRef, useState} from 'react';
import {Circle, Layer, Rect} from 'react-konva';
import {useOutletContext} from 'react-router';
import {OutletContext} from '../../common/types';
import {Ball, Brick, BrickBreaker as Game} from './animation';
import {BrickBreakerSettings} from './settings';

export function BrickBreaker() {
	const {windowSize, settings, updateSettings} =
		useOutletContext<OutletContext<typeof BrickBreakerSettings>>();
	const animationRef = useRef<number>(null);
	const [game, setGame] = useState<Game>();
	const [balls, setBalls] = useState<Ball[]>([]);
	const [bricks, setBricks] = useState<Brick[]>([]);

	useEffect(() => updateSettings(BrickBreakerSettings), []);

	useEffect(() => {
		if (settings.name !== BrickBreakerSettings.name) return;
		setGame(new Game(windowSize, settings.value));
	}, [settings.name]);

	useEffect(() => {
		if (!game) return;
		const animate = () => {
			game.animate();
			setBalls([...game.balls]);
			setBricks([...game.bricks]);
			animationRef.current = requestAnimationFrame(animate);
		};

		animationRef.current = requestAnimationFrame(animate);

		return () => cancelAnimationFrame(animationRef.current as number);
	}, [game]);

	if (settings.name !== BrickBreakerSettings.name) return null;

	return (
		<Layer>
			{bricks.map((brick, index) => (
				<Rect
					key={index}
					x={brick.x}
					y={brick.y}
					width={brick.width}
					height={brick.height}
					fill={brick.fill}
				/>
			))}
			{balls.map((ball, index) => (
				<Circle key={index} x={ball.x} y={ball.y} fill={ball.fill} radius={ball.radius} />
			))}
		</Layer>
	);
}
