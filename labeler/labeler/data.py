from dataclasses import dataclass
from typing import List

from PIL import Image
from imagehash import ImageHash
from numpy.core.records import ndarray


@dataclass
class Face:
    x: int
    y: int
    width: int
    height: int
    encoding: ndarray

    def to_dict(self):
        return {
            "x": self.x,
            "y": self.y,
            "width": self.width,
            "height": self.height,
            "encoding": list(self.encoding)
        }


@dataclass
class LabeledImage:
    hash: ImageHash
    colors: List[int]
    faces: List[Face]

    def to_dict(self):
        return {
            "hash": self.hash.__str__(),
            "colors": self.colors,
            "faces": [face.to_dict() for face in self.faces]
        }


class PendingImage:
    """
    Represents an image that has not been processed
    """
    scale: float
    image: Image
    base_width = 700

    def __init__(self, image: Image):
        self.scale = min(self.base_width, image.width) / image.width
        self.image = image.resize((self.base_width, int(image.height * self.scale)))
