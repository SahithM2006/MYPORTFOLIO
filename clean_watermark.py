"""
clean_watermark.py
Removes the Gemini sparkle watermark from public/center.webp and all 64 frames in public/frames/
using tight-mask seamless inpainting.
"""

import os
import cv2
import numpy as np

def remove_gemini_symbol(image):
    """
    Finds and seamlessly inpaints the Gemini sparkle symbol located
    in the bottom-right corner without altering the surrounding gradient.
    """
    h, w, _ = image.shape
    y1, y2 = int(h * 0.75), h
    x1, x2 = int(w * 0.85), w

    corner = image[y1:y2, x1:x2]

    # In BGR: Red background has Blue < 40, Green < 40.
    # The Gemini sparkle star has elevated Blue & Green channels (> 50).
    b_chan = corner[:, :, 0]
    g_chan = corner[:, :, 1]
    sparkle_mask = ((b_chan > 50) & (g_chan > 50)).astype(np.uint8) * 255

    if np.count_nonzero(sparkle_mask) > 0:
        kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7))
        dilated_mask = cv2.dilate(sparkle_mask, kernel, iterations=2)
        clean_corner = cv2.inpaint(corner, dilated_mask, 5, cv2.INPAINT_TELEA)
        image[y1:y2, x1:x2] = clean_corner

    return image

def process_all():
    # 1. Clean center.webp
    center_path = os.path.join("public", "center.webp")
    if os.path.exists(center_path):
        img = cv2.imread(center_path)
        if img is not None:
            cleaned = remove_gemini_symbol(img)
            cv2.imwrite(center_path, cleaned, [cv2.IMWRITE_WEBP_QUALITY, 95])
            print("[OK] Cleaned watermark from public/center.webp")

    # 2. Clean all frames in public/frames/
    frames_dir = os.path.join("public", "frames")
    if os.path.exists(frames_dir):
        files = sorted([f for f in os.listdir(frames_dir) if f.endswith(".webp")])
        print(f"[+] Processing {len(files)} frames in {frames_dir}...")
        for f in files:
            fpath = os.path.join(frames_dir, f)
            img = cv2.imread(fpath)
            if img is not None:
                cleaned = remove_gemini_symbol(img)
                cv2.imwrite(fpath, cleaned, [cv2.IMWRITE_WEBP_QUALITY, 92])
        print(f"[OK] Successfully removed Gemini watermark from all {len(files)} frames.")

if __name__ == "__main__":
    process_all()
