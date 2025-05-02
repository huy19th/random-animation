import { Circle, Layer, Rect } from 'react-konva';
import { useOutletContext } from 'react-router';
import { OutletContext } from '../../common/types';
import { BrickBreakerSettings } from './settings';
import { sameKeys } from '../../common/utils';
import { BrickBreaker as Game, Brick, Ball } from './animation'
import { useEffect, useRef, useState } from 'react';

export function BrickBreaker() {
    const { windowSize, settings, updateSettings } = useOutletContext<
        OutletContext<typeof BrickBreakerSettings>
    >();
    const animationRef = useRef<number>(null);
    const [game, setGame] = useState<Game>();
    const [balls, setBalls] = useState<Ball[]>([]);
    const [bricks, setBricks] = useState<Brick[]>([]);

    useEffect(() => updateSettings(BrickBreakerSettings), []);

    useEffect(() => {
        if (!sameKeys(settings, BrickBreakerSettings)) return;
        setGame(new Game(settings, windowSize))
    }, [settings])

    useEffect(() => {
        if (!game) return;
        const animate = () => {
            game.animate();
            setBalls([...game.balls]);
            setBricks([...game.bricks]);
            animationRef.current = requestAnimationFrame(animate)
        }

        animationRef.current = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationRef.current!);
    }, [game])

    if (!sameKeys(settings, BrickBreakerSettings)) return null;

    return (
        <Layer>
            {bricks.map(brick =>
                <Rect
                    x={brick.x}
                    y={brick.y}
                    width={brick.width}
                    height={brick.height}
                    fill={brick.fill}
                />
            )}
            {balls.map(ball =>
                <Circle
                    x={ball.x}
                    y={ball.y}
                    fill={ball.fill}
                    radius={ball.radius}
                />
            )}
        </Layer>
    )
}