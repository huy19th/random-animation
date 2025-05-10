import { useEffect, useRef, useState } from "react";
import { Layer, Group, Ellipse, Line, Rect } from "react-konva";
import { useOutletContext } from 'react-router';
import { OutletContext } from '../../common/types';
import { Color } from '../../common/constants';
import { SkyLanternSettings } from './settings';
import { Lantern } from './animation';

export function SkyLantern() {
    const [lanterns, setLanterns] = useState<any[]>([]);
    const animationRef = useRef<any>(null);
    const { windowSize, settings, updateSettings } = useOutletContext<
        OutletContext<typeof SkyLanternSettings>
    >();

    useEffect(() => updateSettings(SkyLanternSettings), []);

    useEffect(() => {
        if (settings.name !== SkyLanternSettings.name) return
        setLanterns(Array.from({ length: settings.value.lantern.count }, () => new Lantern()))
        console.log(settings.value.lantern.count, Array.from({ length: settings.value.lantern.count }, () => new Lantern()))
    }, [settings.name, settings.value?.lantern?.count]);

    useEffect(() => {
        const animate = () => {
            setLanterns(lanterns =>
                lanterns.map(lantern => {
                    lantern.float()
                    return lantern
                }))
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
                // fill={Color.Indigo[950]}
                fillLinearGradientStartPoint={{ x: 0, y: 0 }}
                fillLinearGradientEndPoint={{ x: 0, y: windowSize.height / 2 }}
                fillLinearGradientColorStops={[
                  0, "#0b0c2a",       // deep night blue
                  0.5, "#1a1b3c",     // medium-dark indigo
                  1, "#3a3b68",       // soft bluish-purple
                ]}
            />
            {lanterns.map((lantern, index) => (
                <Group
                    key={index}
                    x={lantern.x}
                    y={lantern.y}
                    rotation={lantern.rotation}
                >
                    <Line
                        points={Lantern.shape}
                        closed
                        fill={Lantern.color}
                    />
                    {Lantern.glow.map(item => <Ellipse {...item} />)}
                    <Ellipse {...Lantern.bottom} />
                    <Ellipse {...Lantern.candleLight} />
                </Group>
            ))}
        </Layer>
    );
}