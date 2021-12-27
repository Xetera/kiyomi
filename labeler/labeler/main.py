from typing import Dict

from dotenv import load_dotenv
import os
from celery import Celery
import labeler.labeling as labeling
from labeler.face import extract_faces
from labeler.phash import calculate_phash

load_dotenv()
queue_prefix = os.environ.get("QUEUE_PREFIX", "labeler")

app = Celery(queue_prefix, broker=os.environ.get("AMQP_URL"), backend=os.environ.get("BACKEND_URL"))


def t(name: str) -> Dict[str, str]:
    """The proper queue-prefixed name of the task"""
    return {
        "name": f"{queue_prefix}.{name}",
        "reply_to": queue_prefix
    }


@app.task(**t('perceptual_hash'))
def perceptual_hash(url: str):
    with labeling.download_image(url) as image:
        return calculate_phash(image).__str__()


@app.task(**t('faces'))
def faces(url: str):
    with labeling.download_image(url) as image:
        pending = labeling.PendingImage(image)
        return [face.to_dict() for face in extract_faces(pending)]


@app.task(**t('full_label'))
def full_label(image_url: str):
    labeled = labeling.label_image(image_url)
    return labeled.to_dict()
