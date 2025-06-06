import {darken} from '@mui/material';
import {useEffect, useRef, useState} from 'react';
import {Ellipse, Group, Layer, Line, Rect} from 'react-konva';
import {useOutletContext} from 'react-router';
import {OutletContext} from '../../common/types';
import {Lantern} from './animation';
import {SkyLanternSettings} from './settings';

export function SkyLantern() {
	const [lanterns, setLanterns] = useState<Lantern[]>([]);
	const animationRef = useRef<any>(null);
	const {windowSize, settings, updateSettings} =
		useOutletContext<OutletContext<typeof SkyLanternSettings>>();

	useEffect(() => updateSettings(SkyLanternSettings), []);

	useEffect(() => {
		if (settings.name !== SkyLanternSettings.name) return;
		if (settings.value.lantern.count > lanterns.length) {
			const newLanterns = Array.from(
				{length: settings.value.lantern.count - lanterns.length},
				() => new Lantern(),
			);
			setLanterns([...lanterns, ...newLanterns]);
		} else {
			setLanterns(lanterns.splice(0, settings.value.lantern.count));
		}
	}, [settings]);

	useEffect(() => {
		const animate = () => {
			setLanterns(lanterns =>
				lanterns.map(lantern => {
					lantern.float();
					return lantern;
				}),
			);
			animationRef.current = requestAnimationFrame(animate);
		};

		animationRef.current = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(animationRef.current);
	}, []);

	if (settings.name !== SkyLanternSettings.name) return null;
	return (
		<Layer>
			<Rect
				width={windowSize.width}
				height={windowSize.height}
				fillLinearGradientStartPoint={{x: 0, y: 0}}
				fillLinearGradientEndPoint={{x: 0, y: windowSize.height / 2}}
				fillLinearGradientColorStops={[
					0,
					darken(settings.value.background.color, 0.4), // deep night blue
					0.5,
					darken(settings.value.background.color, 0.2), // medium-dark indigo
					1,
					settings.value.background.color, // soft bluish-purple
				]}
			/>
			{lanterns.map((lantern, index) => (
				<Group key={index} x={lantern.x} y={lantern.y} rotation={lantern.rotation}>
					<Line points={Lantern.shape} closed fill={Lantern.color} />
					{Lantern.glow.map((item, index) => (
						<Ellipse key={index} {...item} />
					))}
					<Ellipse {...Lantern.bottom} />
					<Ellipse {...Lantern.candleLight} />
				</Group>
			))}
		</Layer>
	);
}
