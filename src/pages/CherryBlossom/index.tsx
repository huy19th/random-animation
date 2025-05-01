import { Layer, Image as Img, Rect } from 'react-konva';
import { Color } from '../../common/constants';
import { OutletContext } from '../../common/types';
import { useOutletContext } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import { sameKeys } from '../../common/utils';
import { Petal } from './petal';
import Sakura from './petal.png';

const defaultSettings = {
  background: {
    color: Color.Neutral[800],
  },
  petal: {
    count: 50,
  },
};

export function CherryBlossom() {
  const { windowSize, settings, updateSettings } = useOutletContext<
    OutletContext<typeof defaultSettings>
  >();

  const [petalImage, setPetalImage] = useState<HTMLImageElement | null>(null);
  const [petals, setPetals] = useState<Petal[]>([]);
  const animationRef = useRef<number>(null);

  // Load the petal image and initialize settings
  useEffect(() => {
    updateSettings(defaultSettings);

    const img = new Image();
    img.src = Sakura;
    img.onload = () => setPetalImage(img);
  }, []);

  // Regenerate petals when petal image or count changes
  useEffect(() => {
    if (!petalImage || !sameKeys(settings, defaultSettings)) return;

    setPetals(
      new Array(settings.petal.count).fill(null).map(() => new Petal())
    );
  }, [petalImage, settings.petal?.count]);

  // Animation loop using requestAnimationFrame
  useEffect(() => {
    if (petals.length === 0) return;
    const animate = () => {
      setPetals(petals.map(petal => {
        petal.fall();
        return petal
      }))
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationRef.current!);
  }, [petals.length]); // run once when petals are initialized

  if (!sameKeys(settings, defaultSettings) || !petalImage) return null;

  return (
    <Layer>
      <Rect
        width={windowSize.width}
        height={windowSize.height}
        fill={settings.background.color}
      />
      {petals.map((petal, index) => (
        <Img
          key={index}
          image={petalImage}
          x={petal.x}
          y={petal.y}
          opacity={petal.opacity}
          width={petal.width}
          height={petal.height}
        />
      ))}
    </Layer>
  );
}
