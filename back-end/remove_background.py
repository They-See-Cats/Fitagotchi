import os
from rembg import remove
from concurrent.futures import ProcessPoolExecutor

def remove_background_from_image(input_path):
    base, ext = os.path.splitext(input_path)
    output_path = f"{base}_nobg{ext}"
    try:
        with open(input_path, 'rb') as input_file:
            input_data = input_file.read()
        output_data = remove(input_data)
        with open(output_path, 'wb') as output_file:
            output_file.write(output_data)
        print(f"Removed background from {input_path}. Saved to {output_path}")
    except Exception as e:
        print(f"Error processing {input_path}: {e}")

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
    
    # Process images in parallel using all available CPU cores
    with ProcessPoolExecutor() as executor:
        executor.map(remove_background_from_image, image_paths)