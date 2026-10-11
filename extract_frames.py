"""
extract_frames.py
Extracts 64 circular trajectory frames from public/character.mp4 into public/frames/
Precisely calibrated for the 8 compass directions:
UP (frame 35) -> RIGHT (frame 80) -> DOWN (frame 125) -> LEFT (frame 172) -> back to UP (frame 215)
And saves neutral frontal frame 10 as public/center.webp for direct eye-contact deadzone.
Seamlessly removes the Gemini sparkle watermark with tight mask inpainting.
"""

import os
import cv2
import numpy as np

def remove_sparkle(image):
    """
    Locates and seamlessly inpaints the Gemini sparkle symbol
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

def extract():
    video_path = os.path.join("public", "character.mp4")
    output_dir = os.path.join("public", "frames")

    if not os.path.exists(video_path):
        print(f"[-] Video file not found: {video_path}")
        return False

    os.makedirs(output_dir, exist_ok=True)

    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        print(f"[-] Failed to open video: {video_path}")
        return False

    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

    print(f"[+] Loaded video: {width}x{height} @ {fps:.1f} FPS, Total frames: {total_frames}")

    # Extract Center Neutral Frame (frame 10 has crisp eye contact looking directly into camera)
    cap.set(cv2.CAP_PROP_POS_FRAMES, 10)
    ret, center_frame = cap.read()
    if ret:
        center_frame = remove_sparkle(center_frame)
        center_path = os.path.join("public", "center.webp")
        cv2.imwrite(center_path, center_frame, [cv2.IMWRITE_WEBP_QUALITY, 95])
        print(f"[OK] Saved center neutral eye contact frame: {center_path}")

        # Detect seamless background color from corners
        corners = [center_frame[:40, :40], center_frame[:40, -40:], center_frame[-40:, :40], center_frame[-40:, -40:]]
        corner_pixels = np.concatenate([c.reshape(-1, 3) for c in corners])
        med_bgr = np.median(corner_pixels, axis=0)
        hex_color = f"#{int(med_bgr[2]):02x}{int(med_bgr[1]):02x}{int(med_bgr[0]):02x}"
        print(f"[OK] Detected background hex color: {hex_color}")

    # 360-degree rotation trajectory:
    # Starts at UP (frame 35) and completes loop back to UP around frame 215
    START_FRAME = 35.0
    END_FRAME = 215.0
    NUM_FRAMES = 64

    print(f"[+] Extracting {NUM_FRAMES} high-quality WebP frames along 360-degree circular trajectory...")
    extracted = 0

    for i in range(NUM_FRAMES):
        target_f = int(round(START_FRAME + i * (END_FRAME - START_FRAME) / NUM_FRAMES))
        target_f = min(target_f, total_frames - 1)

        cap.set(cv2.CAP_PROP_POS_FRAMES, target_f)
        ret, frame = cap.read()
        if not ret:
            print(f"[-] Warning: could not read frame {target_f}")
            continue

        frame = remove_sparkle(frame)

        filename = f"frame_{i:03d}.webp"
        filepath = os.path.join(output_dir, filename)
        cv2.imwrite(filepath, frame, [cv2.IMWRITE_WEBP_QUALITY, 92])
        extracted += 1

    cap.release()
    print(f"[OK] Successfully extracted {extracted}/{NUM_FRAMES} frames into '{output_dir}'.")
    return True

if __name__ == "__main__":
    extract()
