import { useEffect, useState } from 'react';

export const useImage = (url: string) => {
    const [image, setImage] = useState<HTMLImageElement>();

    useEffect(() => {
        const img = new Image();
        img.src = url
        img.onload = () => setImage(img)
    }, [])
    return image
}