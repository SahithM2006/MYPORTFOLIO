"""
build_intro_video.py
Synthesizes a cinematic 1920x1080 30fps intro video featuring Sahith's character.
- Natural facial speaking animation driven by speech amplitude envelope
- Natural eye blinking cycles
- Subtle head sway, breathing, and cinematic camera push-in
- Watermark inpainting
- Cinematic lighting grade & subtle studio vignette matching black/gold/blue theme
- Lower-third candidate badge & speech dialogue captions
- FFmpeg H.264 (yuv420p) + AAC audio muxing
"""

import os
import sys
import wave
import math
import cv2
import numpy as np

FFMPEG_PATH = r"C:\Program Files (x86)\Labcenter Electronics\Proteus 8 Professional\BIN\ffmpeg.exe"
AUDIO_WAV = os.path.join("public", "portfolio-intro-audio.wav")
AUDIO_MP3 = os.path.join("public", "portfolio-intro-audio.mp3")
BASE_IMAGE = os.path.join("public", "center.webp")
OUTPUT_MP4 = os.path.join("public", "portfolio-intro.mp4")
OUTPUT_MP4_ALIAS = os.path.join("public", "videos", "intro.mp4")
OUTPUT_MP4_FALLBACK = os.path.join("public", "intro.mp4")

FPS = 30
WIDTH = 1920
HEIGHT = 1080

def remove_sparkle(image):
    """Inpaints the Gemini sparkle symbol in the bottom-right corner."""
    h, w, _ = image.shape
    y1, y2 = int(h * 0.75), h
    x1, x2 = int(w * 0.85), w
    corner = image[y1:y2, x1:x2]
    b_chan = corner[:, :, 0]
    g_chan = corner[:, :, 1]
    sparkle_mask = ((b_chan > 50) & (g_chan > 50)).astype(np.uint8) * 255
    if np.count_nonzero(sparkle_mask) > 0:
        kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7))
        dilated = cv2.dilate(sparkle_mask, kernel, iterations=2)
        clean = cv2.inpaint(corner, dilated, 5, cv2.INPAINT_TELEA)
        image[y1:y2, x1:x2] = clean
    return image

def compute_audio_envelope(wav_path, fps):
    """Computes normalized RMS audio envelope per video frame."""
    wf = wave.open(wav_path, 'rb')
    sample_rate = wf.getframerate()
    n_channels = wf.getnchannels()
    sampwidth = wf.getsampwidth()
    n_frames = wf.getnframes()
    duration = n_frames / sample_rate

    raw_bytes = wf.readframes(n_frames)
    wf.close()

    # Convert to 16-bit signed numpy array
    if sampwidth == 2:
        audio_data = np.frombuffer(raw_bytes, dtype=np.int16).astype(np.float32) / 32768.0
    else:
        audio_data = np.frombuffer(raw_bytes, dtype=np.uint8).astype(np.float32) / 128.0 - 1.0

    if n_channels > 1:
        audio_data = audio_data[::n_channels]

    total_video_frames = int(math.ceil(duration * fps))
    samples_per_frame = sample_rate / fps

    envelope = np.zeros(total_video_frames, dtype=np.float32)
    window = int(sample_rate * 0.08)  # 80ms analysis window

    for i in range(total_video_frames):
        center_sample = int(i * samples_per_frame)
        start = max(0, center_sample - window // 2)
        end = min(len(audio_data), center_sample + window // 2)
        if end > start:
            chunk = audio_data[start:end]
            rms = np.sqrt(np.mean(chunk ** 2))
            envelope[i] = rms

    # Normalize envelope
    max_val = np.percentile(envelope, 95)
    if max_val > 0.001:
        envelope = np.clip(envelope / max_val, 0.0, 1.0)

    # Smooth attack and decay
    smoothed = np.zeros_like(envelope)
    curr = 0.0
    for i in range(len(envelope)):
        target = envelope[i]
        if target > curr:
            curr = curr * 0.35 + target * 0.65  # Quick attack
        else:
            curr = curr * 0.78 + target * 0.22  # Smooth decay
        smoothed[i] = curr

    return smoothed, duration, total_video_frames

def apply_mouth_animation(face_img, mouth_open_ratio):
    """
    Deforms mouth region in response to speech envelope.
    face_img: 1920x1080 BGR image.
    mouth_open_ratio: float [0.0, 1.0].
    """
    if mouth_open_ratio < 0.04:
        return face_img

    # Mouth center is at (960, 555)
    cx, cy = 960, 555
    rx, ry = 80, 45  # Radius of mouth bounding region

    x1 = cx - rx
    x2 = cx + rx
    y1 = cy - ry
    y2 = cy + ry + int(mouth_open_ratio * 14)

    mouth_patch = face_img[y1:y2, x1:x2].copy()
    ph, pw, _ = mouth_patch.shape

    # Apply mesh warp: drop lower lip downward
    # Create source and destination grid
    map_x = np.zeros((ph, pw), dtype=np.float32)
    map_y = np.zeros((ph, pw), dtype=np.float32)

    max_drop = mouth_open_ratio * 10.0  # Max 10px drop

    for y in range(ph):
        rel_y = (y - ry) / float(ry)  # -1.0 to 1.0+
        for x in range(pw):
            rel_x = (x - rx) / float(rx)  # -1.0 to 1.0
            r_dist = rel_x**2 + rel_y**2
            if r_dist < 1.0 and rel_y > 0:
                # Lower lip: push downward
                weight = math.cos(rel_x * math.pi * 0.5) * (1.0 - rel_y) * (rel_y * 1.5)
                weight = max(0.0, min(1.0, weight))
                map_y[y, x] = y - weight * max_drop
                map_x[y, x] = x
            else:
                map_y[y, x] = y
                map_x[y, x] = x

    warped_mouth = cv2.remap(mouth_patch, map_x, map_y, cv2.INTER_LINEAR)

    # If opening is noticeable, subtly deepen inner lip cavity
    if mouth_open_ratio > 0.25:
        inner_cy = ry + 2
        depth_radius = int(mouth_open_ratio * 6)
        cv2.ellipse(warped_mouth, (rx, inner_cy), (int(rx * 0.45), depth_radius), 0, 0, 360, (20, 20, 30), -1)
        # Soft blur inside mouth cavity
        warped_mouth = cv2.GaussianBlur(warped_mouth, (3, 3), 0)

    # Blend warped mouth patch back into face with soft boundary
    mask = np.zeros((ph, pw), dtype=np.float32)
    for y in range(ph):
        rel_y = (y - ry) / float(ry)
        for x in range(pw):
            rel_x = (x - rx) / float(rx)
            dist = math.sqrt(rel_x**2 + rel_y**2)
            if dist < 0.7:
                mask[y, x] = 1.0
            elif dist < 1.0:
                mask[y, x] = 0.5 * (1.0 + math.cos((dist - 0.7) / 0.3 * math.pi))

    mask_3d = np.repeat(mask[:, :, np.newaxis], 3, axis=2)
    blended = (warped_mouth.astype(np.float32) * mask_3d + mouth_patch.astype(np.float32) * (1.0 - mask_3d)).astype(np.uint8)

    face_img[y1:y2, x1:x2] = blended
    return face_img

def apply_blink_animation(face_img, blink_ratio):
    """
    Simulates natural eyelid blink.
    blink_ratio: float [0.0 = fully open, 1.0 = fully closed].
    """
    if blink_ratio <= 0.02:
        return face_img

    # Eyes: Left=(885, 395), Right=(1035, 395)
    eyes = [(885, 395), (1035, 395)]
    erx, ery = 48, 28

    for ex, ey in eyes:
        x1, x2 = ex - erx, ex + erx
        y1, y2 = ey - ery, ey + ery
        patch = face_img[y1:y2, x1:x2].copy()
        ph, pw, _ = patch.shape

        # Skin tone sample from above eye
        skin_color = face_img[ey - ery - 8, ex].astype(np.float32)

        # Upper eyelid lowers over pupil
        drop_h = int(blink_ratio * ery * 1.5)
        for y in range(ph):
            if y < drop_h:
                factor = min(1.0, (drop_h - y) / 4.0)
                patch[y, :] = (patch[y, :].astype(np.float32) * (1.0 - factor) + skin_color * factor).astype(np.uint8)

        # Draw soft eyelid lash line
        if blink_ratio > 0.6:
            cv2.ellipse(patch, (erx, drop_h), (int(erx * 0.85), 3), 0, 0, 180, (40, 35, 35), 2)

        face_img[y1:y2, x1:x2] = patch

    return face_img

def get_blink_ratio(frame_idx, fps):
    """Returns blink ratio (0.0 to 1.0) based on natural blinking timing."""
    t = frame_idx / float(fps)
    # Blinks at t = 2.4s, t = 6.2s, t = 9.8s
    blink_times = [2.4, 6.2, 9.8]
    blink_dur = 0.16  # 160ms blink

    for bt in blink_times:
        if bt <= t <= bt + blink_dur:
            rel = (t - bt) / blink_dur  # 0.0 to 1.0
            # Up and down triangle wave
            if rel < 0.5:
                return rel * 2.0
            else:
                return (1.0 - rel) * 2.0
    return 0.0

def add_cinematic_overlays(frame, t, duration):
    """Adds subtle cinematic vignetting, lower-third candidate badge, and dialogue captions."""
    h, w, _ = frame.shape

    # 1. Subtle cinematic vignette
    # Darken extreme outer corners by 18% to focus on subject
    vignette = np.zeros((h, w), dtype=np.float32)
    cv2.circle(vignette, (w // 2, h // 2), int(w * 0.62), 1.0, -1)
    vignette = cv2.GaussianBlur(vignette, (151, 151), 0)
    vignette = 0.82 + 0.18 * vignette
    vignette_3d = np.repeat(vignette[:, :, np.newaxis], 3, axis=2)
    frame = np.clip(frame.astype(np.float32) * vignette_3d, 0, 255).astype(np.uint8)

    # 2. Lower-Third Intro Card (0.5s to 4.8s)
    if 0.5 <= t <= 4.8:
        # Fade in / out alpha
        if t < 1.0:
            card_alpha = (t - 0.5) / 0.5
        elif t > 4.2:
            card_alpha = (4.8 - t) / 0.6
        else:
            card_alpha = 1.0

        card_alpha = min(1.0, max(0.0, card_alpha))

        # Card position: bottom left (x: 100, y: 880, w: 520, h: 96)
        cx1, cy1, cx2, cy2 = 100, 870, 680, 970
        overlay = frame.copy()
        cv2.rectangle(overlay, (cx1, cy1), (cx2, cy2), (15, 12, 10), -1)  # Obsidian slate
        # Accent left gold bar
        cv2.rectangle(overlay, (cx1, cy1), (cx1 + 4, cy2), (90, 164, 198), -1)  # BGR gold (#C6A45A)
        # Accent subtle border
        cv2.rectangle(overlay, (cx1, cy1), (cx2, cy2), (73, 59, 52), 1)

        # Pulse dot
        pulse = int(128 + 127 * math.sin(t * 8.0))
        cv2.circle(overlay, (cx1 + 24, cy1 + 28), 5, (200, 150, 117), -1)  # Steel blue (#7596C8)

        # Text
        cv2.putText(overlay, "SAHITH M.", (cx1 + 40, cy1 + 33), cv2.FONT_HERSHEY_SIMPLEX, 0.72, (212, 226, 233), 2, cv2.LINE_AA)
        cv2.putText(overlay, "AI & DATA SCIENCE // SAVEETHA ENGG", (cx1 + 24, cy1 + 64), cv2.FONT_HERSHEY_SIMPLEX, 0.46, (90, 164, 198), 1, cv2.LINE_AA)
        cv2.putText(overlay, "CHENNAI, IN  *  AUTONOMOUS", (cx1 + 24, cy1 + 84), cv2.FONT_HERSHEY_SIMPLEX, 0.38, (160, 160, 160), 1, cv2.LINE_AA)

        cv2.addWeighted(overlay, card_alpha * 0.92, frame, 1.0 - card_alpha * 0.92, 0, frame)

    # 3. Clean Speech Captions at Bottom (0.4s to 11.8s)
    captions = [
        (0.4, 2.5, "Hi, I'm Sahith."),
        (2.5, 6.8, "I build intelligent AI applications and innovative software solutions."),
        (6.8, 9.6, "Explore my work, projects, and ideas."),
        (9.6, 11.8, "Welcome to my portfolio.")
    ]

    for start_t, end_t, text in captions:
        if start_t <= t <= end_t:
            # Alpha fade
            fade_in = min(1.0, (t - start_t) / 0.25)
            fade_out = min(1.0, (end_t - t) / 0.25)
            cap_alpha = min(fade_in, fade_out)

            # Measure text
            font = cv2.FONT_HERSHEY_DUPLEX
            scale = 0.82
            thickness = 2
            (tw, th), _ = cv2.getTextSize(text, font, scale, thickness)
            tx = (w - tw) // 2
            ty = 1010

            # Subtitle pill background
            px1, py1 = tx - 24, ty - th - 12
            px2, py2 = tx + tw + 24, ty + 12

            sub_overlay = frame.copy()
            cv2.rectangle(sub_overlay, (px1, py1), (px2, py2), (8, 10, 15), -1)
            cv2.rectangle(sub_overlay, (px1, py1), (px2, py2), (73, 59, 52), 1)

            # Render text
            cv2.putText(sub_overlay, text, (tx, ty), font, scale, (230, 230, 235), thickness, cv2.LINE_AA)
            cv2.addWeighted(sub_overlay, cap_alpha * 0.88, frame, 1.0 - cap_alpha * 0.88, 0, frame)
            break

    return frame

def generate_video():
    print("[1/5] Loading character visual reference...")
    if not os.path.exists(BASE_IMAGE):
        print(f"[-] Base image not found: {BASE_IMAGE}")
        return False

    base_frame = cv2.imread(BASE_IMAGE)
    base_frame = remove_sparkle(base_frame)
    h, w, _ = base_frame.shape
    print(f"[+] Loaded base character frame: {w}x{h}")

    print("[2/5] Computing speech audio envelope...")
    if not os.path.exists(AUDIO_WAV):
        print(f"[-] Audio WAV not found: {AUDIO_WAV}")
        return False

    envelope, duration, total_frames = compute_audio_envelope(AUDIO_WAV, FPS)
    print(f"[+] Audio duration: {duration:.2f}s, Total video frames: {total_frames} @ {FPS} FPS")

    # Render frames to temp folder
    temp_dir = os.path.join("public", "temp_intro_frames")
    os.makedirs(temp_dir, exist_ok=True)

    existing_frames = [f for f in os.listdir(temp_dir) if f.endswith(".png")]
    if len(existing_frames) == total_frames:
        print(f"[3/5] Found {total_frames} existing rendered frames. Skipping re-render.")
    else:
        print(f"[3/5] Synthesizing {total_frames} cinematic speaking frames...")
        for i in range(total_frames):
            t = i / float(FPS)
            amp = envelope[i]

            # 1. Copy base frame
            curr_frame = base_frame.copy()

            # 2. Speaking animation (mouth deformation synced to audio amplitude)
            curr_frame = apply_mouth_animation(curr_frame, amp)

            # 3. Natural eye blinking
            blink_ratio = get_blink_ratio(i, FPS)
            curr_frame = apply_blink_animation(curr_frame, blink_ratio)

            # 4. Subtle head sway & breathing & slow camera push-in
            zoom = 1.0 + 0.032 * (t / duration)
            dx = 2.2 * math.sin(2.0 * math.pi * t / 4.6)
            dy = 1.6 * math.cos(2.0 * math.pi * t / 3.0)
            tilt = 0.28 * math.sin(2.0 * math.pi * t / 5.2)

            fc_x, fc_y = w * 0.5, h * 0.38
            M = cv2.getRotationMatrix2D((fc_x, fc_y), tilt, zoom)
            M[0, 2] += dx
            M[1, 2] += dy

            curr_frame = cv2.warpAffine(curr_frame, M, (w, h), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT_101)

            # 5. Cinematic overlays (lower-third badge + speech captions)
            curr_frame = add_cinematic_overlays(curr_frame, t, duration)

            frame_path = os.path.join(temp_dir, f"frame_{i:05d}.png")
            cv2.imwrite(frame_path, curr_frame)

            if i % 60 == 0 or i == total_frames - 1:
                print(f"    Rendered frame {i+1}/{total_frames} ({((i+1)/total_frames)*100:.1f}%)")



    print("[4/5] Muxing video and audio with FFmpeg H.264 & AAC...")
    frame_pattern = os.path.join(temp_dir, "frame_%05d.png")

    os.makedirs(os.path.dirname(OUTPUT_MP4_ALIAS), exist_ok=True)

    import subprocess
    cmd = [
        FFMPEG_PATH,
        '-y',
        '-framerate', str(FPS),
        '-i', frame_pattern,
        '-i', AUDIO_WAV,
        '-c:v', 'libx264',
        '-profile:v', 'high',
        '-pix_fmt', 'yuv420p',
        '-crf', '19',
        '-c:a', 'aac',
        '-b:a', '192k',
        '-movflags', '+faststart',
        '-shortest',
        OUTPUT_MP4
    ]

    print(f"Executing: {' '.join(cmd)}")
    proc = subprocess.run(cmd, capture_output=True, text=True)

    if proc.returncode != 0 or not os.path.exists(OUTPUT_MP4):
        print(f"[-] FFmpeg encoding failed with code {proc.returncode}: {proc.stderr}")
        return False

    file_size = os.path.getsize(OUTPUT_MP4)
    print(f"[OK] Successfully generated video: {OUTPUT_MP4} ({file_size / (1024*1024):.2f} MB)")

    # Also copy to aliases for maximum compatibility
    import shutil
    shutil.copyfile(OUTPUT_MP4, OUTPUT_MP4_ALIAS)
    shutil.copyfile(OUTPUT_MP4, OUTPUT_MP4_FALLBACK)
    print(f"[OK] Mirrored to {OUTPUT_MP4_ALIAS} and {OUTPUT_MP4_FALLBACK}")

    # Clean up temp frames
    for f in os.listdir(temp_dir):
        os.remove(os.path.join(temp_dir, f))
    os.rmdir(temp_dir)
    print("[5/5] Temporary frames cleaned up. Complete!")
    return True

if __name__ == "__main__":
    success = generate_video()
    sys.exit(0 if success else 1)
