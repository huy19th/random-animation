import { Layer, Image as Img, Rect } from 'react-konva';
import { OutletContext } from '../../common/types';
import { useOutletContext } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import { Petal } from './animation';
import Sakura from './petal.png';
import { useImage } from '../../common/hooks';
import { CherryBlossomSettings, } from './settings';

export function CherryBlossom() {
  const { windowSize, settings, updateSettings } = useOutletContext<
    OutletContext<typeof CherryBlossomSettings>
  >();
  const animationRef = useRef<number>(null);
  const petalImage = useImage(Sakura)
  const [petals, setPetals] = useState<Petal[]>([]);

  // initialize settings
  useEffect(() => updateSettings(CherryBlossomSettings), []);

  // Regenerate petals when petal image or count changes
  useEffect(() => {
    if (!petalImage || settings.name !== CherryBlossomSettings.name) return;
    setPetals(
      new Array(settings.value.petal.count).fill(null).map(() => new Petal())
    );
  }, [petalImage, settings.value.petal?.count]);

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

  if (settings.name !== CherryBlossomSettings.name || !petalImage) return null;

  return (
    <Layer>
      <Rect
        width={windowSize.width}
        height={windowSize.height}
        fill={settings.value.background.color}
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
