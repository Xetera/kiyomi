import io
import sys
from PIL import Image
from imagehash import phash, whash

buffer = sys.stdin.buffer.read()

if len(buffer) == 0:
  raise IOError("No image received")

image = Image.open(io.BytesIO(buffer))

out = phash(image, hash_size=32)

print(out, flush=True, end='')
sys.stdout.flush()
# import cv2 as cv
# import json
# import numpy as np

# def get_hist(name):
#   src_base = cv.imread(name)
#   hsv_base = cv.cvtColor(src_base, cv.COLOR_BGR2HSV)
#   hsv_half_down = hsv_base[hsv_base.shape[0]//2:,:]
#   h_bins = 50
#   s_bins = 60
#   histSize = [h_bins, s_bins]
#   # hue varies from 0 to 179, saturation from 0 to 255
#   h_ranges = [0, 180]
#   s_ranges = [0, 256]
#   ranges = h_ranges + s_ranges # concat lists
#   # Use the 0-th and 1-st channels
#   channels = [0, 1]
#   hist_base = cv.calcHist([hsv_base], channels, None, histSize, ranges, accumulate=False)
#   cv.normalize(hist_base, hist_base, alpha=0, beta=1, norm_type=cv.NORM_MINMAX)
#   return hist_base

# a = get_hist('1.webp')
# b = get_hist('2.webp')
# c = get_hist('three.webp')

# print(len(a.flatten().tolist()))

# oo = cv.compareHist(a, b, 3)
# nn = cv.compareHist(a, c, 3)
# print(oo)
# print(nn)

# for compare_method in range(4):
#     base_base = cv.compareHist(hist_base, hist_base, compare_method)
#     base_half = cv.compareHist(hist_base, hist_half_down, compare_method)
#     base_test1 = cv.compareHist(hist_base, hist_test1, compare_method)
#     base_test2 = cv.compareHist(hist_base, hist_test2, compare_method)
#     print('Method:', compare_method, 'Perfect, Base-Half, Base-Test(1), Base-Test(2) :',\
#           base_base, '/', base_half, '/', base_test1, '/', base_test2)