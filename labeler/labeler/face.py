from typing import List

import face_recognition
import numpy

from labeler.data import PendingImage, Face


# TODO: replace this with custom ML model
def extract_faces(pending: PendingImage) -> List[Face]:
    array = numpy.asarray(pending.image)
    locations = face_recognition.face_locations(array)
    encodings = face_recognition.face_encodings(array)
    return [
        Face(
            x=int(left / pending.scale),
            y=int(top / pending.scale),
            width=int((right - left) / pending.scale),
            height=int((bottom - top) / pending.scale),
            encoding=encoding
        )
        for (top, right, bottom, left), encoding in zip(locations, encodings)
    ]
