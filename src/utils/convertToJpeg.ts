const convertToJPEG = (imageFile: File): Promise<Blob> => {
	if (!imageFile.type.startsWith("image/")) {
		throw new Error("Invalid file type");
	}

	return new Promise((resolve, reject) => {
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		const img = new Image();

		if (!ctx) {
			reject(new Error("Failed to get ctx"));
			return;
		}

		img.onload = () => {
			canvas.width = img.width;
			canvas.height = img.height;
			ctx.drawImage(img, 0, 0);
			canvas.toBlob((blob) => {
				if (blob) resolve(blob)
				else reject(new Error("Failed to create JPEG Blob"));
			}, 'image/jpeg');
		};

		img.onerror = () => reject('Image loading error');
		img.src = URL.createObjectURL(imageFile);
	});
};

export default convertToJPEG
