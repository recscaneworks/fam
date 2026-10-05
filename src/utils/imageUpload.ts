/**
 * Utility to compress and convert uploaded or camera-captured images
 * into optimized lightweight Base64 JPEG data URLs for storage.
 */
export const compressImageFile = (file: File, maxWidth = 800, quality = 0.82): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Output as lightweight JPEG
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };
      img.onerror = () => reject(new Error('Şəkil oxunarkən xəta baş verdi'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Fayl oxunarkən xəta baş verdi'));
    reader.readAsDataURL(file);
  });
};
