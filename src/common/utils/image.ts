export const loadImage = async (url: string) => {
    const img = new Image();
    img.src = url;
    await new Promise((resolve, reject) => {
        img.addEventListener('load', () => resolve(true));
    });
    return img;
}