from PIL import Image

def resize_images(image_paths, output_size=(790, 254)):
    for image_path in image_paths:
        try:
            with Image.open(image_path) as img:
                img = img.resize(output_size, resample=Image.Resampling.LANCZOS)
                img.save(image_path)
                print(f"Resized {image_path} to {output_size}")
        except Exception as e:
            print(f"Error resizing {image_path}: {e}")

if __name__ == "__main__":
    image_paths = [
        "../front-end/assets/zero-heart.png",
        "../front-end/assets/half-heart.png",
        "../front-end/assets/one-heart.png",
        "../front-end/assets/one-half-heart.png",
        "../front-end/assets/two-heart.png",
        "../front-end/assets/two-half-heart.png",
        "../front-end/assets/three-heart.png"
    ]
    
    resize_images(image_paths)