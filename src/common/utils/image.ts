export const loadImage = async (url: string) => {
    console.log('load image')
    const img = new Image();
    img.src = url;
    await new Promise((resolve, reject) => {
        img.addEventListener('load', () => resolve(true));
    });
    return img;
}