from typing import List

from PIL import Image


def extract_palette(image: Image, color_count: int = 10) -> List[int]:
    """
    Grabs the dominant images from an image
    :param image:
    :param color_count:
    :return: List of dominant colors in decimal
    """
    # Reduce to palette
    paletted = image.convert('P', palette=Image.ADAPTIVE, colors=color_count)

    # Find dominant colors
    palette = paletted.getpalette()
    color_counts = sorted(paletted.getcolors(), reverse=True)

    def get_color(palette_index):
        return tuple(palette[palette_index * 3:palette_index * 3 + 3])

    parts = (get_color(count[1]) for count in color_counts)
    return [(r << 16) + (g << 8) + b for (r, g, b) in parts]
