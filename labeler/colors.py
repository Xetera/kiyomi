from PIL import Image, ImageDraw
import io
import sys

def get_colors(image_file, numcolors=10, resize=150):
    # Resize image to speed up processing
    img = Image.open(image_file)
    img = img.copy()
    img.thumbnail((resize, resize))

    # Reduce to palette
    paletted = img.convert('P', palette=Image.ADAPTIVE, colors=numcolors)

    # Find dominant colors
    palette = paletted.getpalette()
    color_counts = sorted(paletted.getcolors(), reverse=True)
    def get_color(palette_index):
        return tuple(palette[palette_index*3:palette_index*3+3])
    return (get_color(count[1]) for count in color_counts)

buffer = sys.stdin.buffer.read()
colors = get_colors(io.BytesIO(buffer))

print([(r << 16) + (g << 8) + b for (r, g, b) in colors])
