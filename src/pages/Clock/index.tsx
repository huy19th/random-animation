import {lighten} from '@mui/material';
import {useEffect, useState} from 'react';
import {Circle, Layer, Rect, Text} from 'react-konva';
import {useOutletContext} from 'react-router';
import {OutletContext} from '../../common/types/outlet-context';
import {ClockSettings} from './settings';

export function Clock() {
	const {windowSize, settings, updateSettings} =
		useOutletContext<OutletContext<typeof ClockSettings>>();
	const [time, updateTime] = useState(new Date());

	const unit =
		Math.min(windowSize.width, windowSize.height) *
		(window.innerHeight < window.innerWidth ? 1 / 4 : 2 / 5);

	const timeout = setTimeout(() => updateTime(new Date()), 1000);

	useEffect(() => {
		updateSettings(ClockSettings);
		return () => clearTimeout(timeout);
	}, []);

	if (settings.name !== ClockSettings.name) return null;

	const angle = -(time.getSeconds() + 1) * 6;
	const {
		clock,
		numbers: {roman},
	} = settings.value;
	const {second_hand, minute_hand, hour_hand, center, numbers} = settings.value.constant;

	return (
		<>
			<Layer>
				<Rect
					width={windowSize.width}
					height={windowSize.height}
					fill={clock.background}
				/>
			</Layer>
			<Layer x={windowSize.width / 2} y={windowSize.height / 2} rotation={angle}>
				{(roman
					? ['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI']
					: ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']
				).map((item, index) => (
					<Text
						key={`${item}${index}`}
						text={item}
						fill={clock.color}
						fontSize={numbers.size * clock.size}
						rotation={index * 30}
						x={
							Math.sin((Math.PI / 6) * index) *
							(numbers.distance + numbers.size) *
							clock.size
						}
						y={
							-Math.cos((Math.PI / 6) * index) *
							(numbers.distance + numbers.size) *
							clock.size
						}
						width={numbers.size * 2 * clock.size}
						offsetX={numbers.size * clock.size}
						align='center'
					/>
				))}
			</Layer>
			<Layer offsetX={-window.innerWidth / 2} offsetY={-window.innerHeight / 2}>
				<Rect
					width={second_hand.width * clock.size}
					height={second_hand.height * clock.size}
					fill={lighten(clock.color, 0.2)}
					offsetX={(second_hand.width / 2) * clock.size}
					offsetY={((unit * 180) / 200) * clock.size}
				/>
			</Layer>
			<Layer x={window.innerWidth / 2} y={window.innerHeight / 2} rotation={angle}>
				<Rect
					width={minute_hand.width * clock.size}
					height={minute_hand.height * clock.size}
					fill={lighten(clock.color, 0.15)}
					offsetX={(minute_hand.width / 2) * clock.size}
					offsetY={((unit * 20) / 200) * clock.size}
					rotation={time.getMinutes() * 6 + 180}
				/>
				<Rect
					width={hour_hand.width * clock.size}
					height={hour_hand.height * clock.size}
					fill={lighten(clock.color, 0.1)}
					offsetX={(hour_hand.width / 2) * clock.size}
					offsetY={((unit * 20) / 200) * clock.size}
					rotation={((time.getHours() + (time.getMinutes() + 1) / 60) % 12) * 30}
				/>
				<Circle x={0} y={0} fill={lighten(clock.color, 0.05)} radius={center.radius} />
			</Layer>
		</>
	);
}
