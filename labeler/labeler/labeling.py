import io

from PIL import Image

import requests

from labeler.colors import extract_palette
from labeler.data import LabeledImage, PendingImage
from labeler.face import extract_faces, Face
from labeler.phash import calculate_phash


def download_image(url: str) -> Image:
    result = requests.get(url)
    with Image.open(io.BytesIO(result.content)) as image:
        return image.convert('RGB')


def label_image(image_url: str) -> LabeledImage:
    with download_image(image_url) as image:
        pending = PendingImage(image)
        colors = extract_palette(pending.image)
        hashed = calculate_phash(pending.image)
        faces = extract_faces(pending)
        return LabeledImage(hashed, colors, faces)
