"""Build the five FrameGuide phone screens for the BetterU site.

Output: 720x1561 WebP, matching the other apps' screenshots.

Two of the five are lifted straight out of the App Store marketing assets
(they contain real app UI over stock landscape photography — no personal
photos). The other three are rebuilt from the same UI vocabulary, because the
marketing shots crop those screens off mid-sheet.
"""
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont

W, H = 720, 1561
FONT = "/System/Library/Fonts/HelveticaNeue.ttc"

GREEN = (47, 159, 128)
GREEN_HI = (72, 197, 160)
INK = (8, 9, 11)
SHEET = (19, 20, 24)
CARD = (33, 34, 37)
TEXT = (238, 240, 241)
DIM = (150, 155, 158)
ORANGE = (240, 146, 58)


def f(size, weight="regular"):
    idx = {"regular": 0, "bold": 1, "medium": 10, "light": 7}[weight]
    return ImageFont.truetype(FONT, size, index=idx)


def status_bar(d, time="17:47", fg=TEXT):
    d.text((44, 46), time, font=f(28, "bold"), fill=fg)
    # signal / wifi / battery, drawn simply
    x = W - 150
    for i in range(4):
        h = 8 + i * 5
        d.rounded_rectangle([x + i * 11, 62 - h, x + i * 11 + 7, 62], radius=2, fill=fg)
    d.rounded_rectangle([W - 96, 48, W - 54, 64], radius=5, outline=fg, width=3)
    d.rounded_rectangle([W - 93, 51, W - 63, 61], radius=3, fill=fg)
    d.rounded_rectangle([W - 51, 53, W - 47, 59], radius=2, fill=fg)


def home_bar(d, fg=(120, 120, 124)):
    d.rounded_rectangle([W // 2 - 78, H - 30, W // 2 + 78, H - 24], radius=3, fill=fg)


_clean = None


def clean_photo():
    """
    The landscape out of the real viewfinder, with the app's own rule-of-thirds
    overlay painted out — otherwise every screen that reuses this photo carries
    a grid that belongs to a different mode. The grid sits on fixed lines, so
    each band is replaced by a blend of the pixels just outside it.
    """
    global _clean
    if _clean is not None:
        return _clean
    im = Image.open("shot3.png").convert("RGB").crop((135, 890, 790, 1860))
    px = im.load()
    w, h = im.size
    lerp = lambda a, b, t: tuple(round(a[i] + (b[i] - a[i]) * t) for i in range(3))
    for x0, x1 in [(176, 186), (463, 473)]:  # orange + white verticals
        for y in range(h):
            left, right = px[max(0, x0 - 1), y], px[min(w - 1, x1 + 1), y]
            for x in range(x0, x1 + 1):
                px[x, y] = lerp(left, right, (x - x0 + 1) / (x1 - x0 + 2))
    for y0, y1 in [(308, 322), (608, 622)]:  # horizontals + crosshair arms
        for x in range(w):
            top, bot = px[x, max(0, y0 - 1)], px[x, min(h - 1, y1 + 1)]
            for y in range(y0, y1 + 1):
                px[x, y] = lerp(top, bot, (y - y0 + 1) / (y1 - y0 + 2))
    _clean = im
    return im


def photo(zoom=1.0, shift=(0, 0)):
    """The landscape frame out of the real app screenshot, cropped to fill."""
    src = clean_photo().copy()
    tw, th = int(W * zoom), int(H * zoom)
    scale = max(tw / src.width, th / src.height)
    src = src.resize((int(src.width * scale), int(src.height * scale)), Image.LANCZOS)
    x = (src.width - W) // 2 + shift[0]
    y = (src.height - H) // 2 + shift[1]
    x = max(0, min(src.width - W, x))
    y = max(0, min(src.height - H, y))
    return src.crop((x, y, x + W, y + H))


def pill(d, box, label, active, font=None, radius=None):
    font = font or f(30, "medium")
    r = radius if radius is not None else (box[3] - box[1]) // 2
    d.rounded_rectangle(box, radius=r, fill=GREEN if active else CARD)
    tw = d.textlength(label, font=font)
    d.text(
        ((box[0] + box[2] - tw) / 2, (box[1] + box[3]) / 2 - font.size * 0.62),
        label,
        font=font,
        fill=(8, 38, 29) if active else TEXT,
    )


def glow_rect(img, box, colour, width=5, blur=16, alpha=190):
    """A soft neon rectangle, drawn as its own blurred layer."""
    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    ld = ImageDraw.Draw(layer)
    ld.rectangle(box, outline=colour + (alpha,), width=width)
    img.alpha_composite(layer.filter(ImageFilter.GaussianBlur(blur)))
    crisp = Image.new("RGBA", img.size, (0, 0, 0, 0))
    ImageDraw.Draw(crisp).rectangle(box, outline=colour + (255,), width=3)
    img.alpha_composite(crisp)


# ----------------------------------------------------------------- 1. AR hero
def screen_ar():
    img = photo(zoom=1.15, shift=(30, -40)).convert("RGBA")
    # darken so the overlay reads
    img.alpha_composite(Image.new("RGBA", (W, H), (4, 8, 8, 70)))
    glow_rect(img, [96, 470, 624, 1090], GREEN_HI)

    d = ImageDraw.Draw(img)
    # corner ticks on the suggested frame
    for cx, cy, sx, sy in [(96, 470, 1, 1), (624, 470, -1, 1), (96, 1090, 1, -1), (624, 1090, -1, -1)]:
        d.line([cx, cy, cx + 46 * sx, cy], fill=GREEN_HI, width=7)
        d.line([cx, cy, cx, cy + 46 * sy], fill=GREEN_HI, width=7)

    status_bar(d, "17:46")
    # top chip
    d.rounded_rectangle([W // 2 - 148, 128, W // 2 + 148, 188], radius=30, fill=(6, 22, 19, 225))
    t = "AR FRAME MATCH"
    fo = f(26, "bold")
    d.text(((W - d.textlength(t, font=fo)) / 2, 145), t, font=fo, fill=GREEN_HI)

    # "walk into the shot"
    t = "WALK INTO THE SHOT"
    fo = f(30, "bold")
    tw = d.textlength(t, font=fo)
    d.text(((W - tw) / 2, 1180), t, font=fo, fill=GREEN_HI)
    d.line([W // 2 - 26, 1150, W // 2, 1124], fill=GREEN_HI, width=7)
    d.line([W // 2, 1124, W // 2 + 26, 1150], fill=GREEN_HI, width=7)

    # distance readout
    t = "2.4 m  ·  step back a little"
    fo = f(26)
    d.text(((W - d.textlength(t, font=fo)) / 2, 1232), t, font=fo, fill=(226, 236, 233))

    # shutter row
    d.rectangle([0, 1330, W, H], fill=(8, 9, 11))
    d.ellipse([W // 2 - 62, 1388, W // 2 + 62, 1512], outline=GREEN_HI, width=6)
    d.ellipse([W // 2 - 50, 1400, W // 2 + 50, 1500], fill=(252, 252, 252))
    thumb = photo(zoom=1.0).resize((96, 96), Image.LANCZOS)
    img.paste(thumb, (44, 1402))
    d.rounded_rectangle([44, 1402, 140, 1498], radius=16, outline=(90, 94, 96), width=3)
    d.rounded_rectangle([W - 140, 1402, W - 44, 1498], radius=16, fill=(24, 26, 27))
    for i in range(1, 3):
        gx = W - 140 + i * 32
        d.line([gx, 1402, gx, 1498], fill=GREEN, width=2)
        gy = 1402 + i * 32
        d.line([W - 140, gy, W - 44, gy], fill=GREEN, width=2)
    home_bar(d)
    return img.convert("RGB")


# ------------------------------------------------------------- 2. rule of thirds
def screen_thirds():
    src = Image.open("shot3.png").convert("RGB").crop((139, 678, 786, 2000))
    canvas = Image.new("RGB", (src.width, 1404), (8, 9, 10))
    canvas.paste(src, (0, 0))
    d = ImageDraw.Draw(canvas)
    d.rounded_rectangle(
        [canvas.width // 2 - 70, 1404 - 26, canvas.width // 2 + 70, 1404 - 21],
        radius=3,
        fill=(120, 120, 124),
    )
    return canvas.resize((W, H), Image.LANCZOS)


# --------------------------------------------------------------- 3. scene info
def screen_scene():
    img = Image.new("RGB", (W, H), SHEET)
    d = ImageDraw.Draw(img)
    status_bar(d)

    d.text((44, 120), "Cancel", font=f(30), fill=TEXT)
    t = "Skip"
    d.text((W - 44 - d.textlength(t, font=f(30)), 120), t, font=f(30), fill=GREEN_HI)

    label = "AR FrameGuide"
    fo = f(28, "bold")
    d.text((44, 214), label, font=fo, fill=GREEN_HI)
    bx = 44 + d.textlength(label, font=fo) + 16
    d.rounded_rectangle([bx, 210, bx + 62, 248], radius=19, fill=(16, 52, 43))
    d.text((bx + 15, 218), "AR", font=f(22, "bold"), fill=GREEN_HI)

    d.text((44, 262), "Scene info", font=f(52, "bold"), fill=TEXT)
    d.text((44, 336), "Tell FrameGuide who's in the shot", font=f(26), fill=DIM)
    d.text((44, 374), "and where you are.", font=f(26), fill=DIM)

    d.rounded_rectangle([44, 432, 92, 444], radius=6, fill=GREEN)
    d.ellipse([104, 432, 116, 444], fill=(70, 72, 76))

    # SUBJECT
    d.text((44, 498), "SUBJECT", font=f(25, "bold"), fill=(168, 172, 175))
    t = "People coaching on"
    d.text((W - 44 - d.textlength(t, font=f(25)), 498), t, font=f(25), fill=(120, 124, 128))
    pill(d, [44, 544, 232, 620], "None", False)
    pill(d, [248, 544, 444, 620], "Selfie", False)
    pill(d, [460, 544, 676, 620], "Person", True)
    pill(d, [44, 636, 268, 712], "Group", False)

    # PLACE
    d.text((44, 778), "PLACE", font=f(25, "bold"), fill=(168, 172, 175))
    t = "Doors, walls, rooms"
    d.text((W - 44 - d.textlength(t, font=f(25)), 778), t, font=f(25), fill=(120, 124, 128))
    pill(d, [44, 824, 268, 900], "Indoors", True)
    pill(d, [284, 824, 524, 900], "Outdoors", False)
    pill(d, [44, 916, 316, 992], "Landscape", False)

    # actions
    d.rounded_rectangle([44, 1252, W - 44, 1352], radius=22, fill=GREEN)
    t = "Continue"
    fo = f(34, "bold")
    d.text(((W - d.textlength(t, font=fo)) / 2, 1285), t, font=fo, fill=(6, 30, 24))
    t = "Skip — open AR"
    fo = f(30, "medium")
    d.text(((W - d.textlength(t, font=fo)) / 2, 1392), t, font=fo, fill=GREEN_HI)
    home_bar(d)
    return img


# ------------------------------------------------------------------ 4. library
def screen_album():
    img = Image.new("RGB", (W, H), INK)
    d = ImageDraw.Draw(img)
    status_bar(d, "17:40")

    d.text((44, 128), "LIBRARY", font=f(27, "bold"), fill=(150, 155, 158))

    d.rounded_rectangle([40, 190, W - 40, 322], radius=26, fill=(26, 28, 30))
    d.rounded_rectangle([70, 220, 172, 292], radius=18, fill=(16, 52, 43))
    d.rounded_rectangle([88, 240, 146, 278], radius=8, outline=GREEN_HI, width=4)
    d.ellipse([98, 250, 112, 264], fill=GREEN_HI)
    d.text((202, 222), "Album", font=f(36, "bold"), fill=TEXT)
    d.text((202, 272), "19 shots · Save to Photos from here", font=f(25), fill=DIM)
    d.line([W - 84, 240, W - 68, 256], fill=(150, 155, 158), width=4)
    d.line([W - 68, 256, W - 84, 272], fill=(150, 155, 158), width=4)

    # grid of recent shots — one source photo, so each tile is re-cropped,
    # mirrored and re-graded to read as a genuinely varied roll
    cols, gap, pad = 3, 12, 40
    cw = (W - pad * 2 - gap * (cols - 1)) // cols
    ch = int(cw * 1.28)
    variants = [
        (1.0, (0, 0), False, 1.00, 1.00), (1.35, (-90, 40), True, 0.88, 1.06),
        (1.2, (120, -60), False, 1.12, 0.95), (1.6, (60, 120), True, 0.94, 1.02),
        (1.1, (-150, -30), False, 0.82, 1.10), (1.45, (170, 90), True, 1.08, 0.97),
        (1.25, (-40, 150), False, 0.90, 1.04), (1.5, (-180, -110), True, 1.15, 0.93),
        (1.15, (90, 10), False, 0.86, 1.08), (1.3, (-60, -140), True, 1.02, 1.00),
        (1.55, (140, -90), False, 0.92, 1.05), (1.18, (10, 180), True, 1.10, 0.96),
    ]
    for i, (z, s, flip, bright, cool) in enumerate(variants):
        r, c = divmod(i, cols)
        x = pad + c * (cw + gap)
        y = 372 + r * (ch + gap)
        if y + ch > H - 60:
            break
        tile = photo(zoom=z, shift=s).resize((cw, ch), Image.LANCZOS)
        if flip:
            tile = tile.transpose(Image.FLIP_LEFT_RIGHT)
        tile = ImageEnhance.Brightness(tile).enhance(bright)
        rr, gg, bb = tile.split()
        tile = Image.merge("RGB", (rr.point(lambda v: min(255, int(v / cool))), gg,
                                   bb.point(lambda v: min(255, int(v * cool)))))
        mask = Image.new("L", (cw, ch), 0)
        ImageDraw.Draw(mask).rounded_rectangle([0, 0, cw - 1, ch - 1], radius=16, fill=255)
        img.paste(tile, (x, y), mask)
    home_bar(d)
    return img


# ---------------------------------------------------------------------- 5. pro
def screen_pro():
    img = Image.new("RGB", (W, H), (10, 18, 17))
    d = ImageDraw.Draw(img)
    # soft teal wash at the top
    wash = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(wash).ellipse([-260, -520, W + 260, 540], fill=GREEN + (70,))
    img = Image.alpha_composite(img.convert("RGBA"), wash.filter(ImageFilter.GaussianBlur(110))).convert("RGB")
    d = ImageDraw.Draw(img)
    status_bar(d)

    d.rounded_rectangle([W // 2 - 116, 168, W // 2 + 116, 228], radius=30, fill=(16, 52, 43))
    t = "FRAMEGUIDE PRO"
    fo = f(25, "bold")
    d.text(((W - d.textlength(t, font=fo)) / 2, 184), t, font=fo, fill=GREEN_HI)

    for i, line in enumerate(["Clean saves.", "No watermark."]):
        fo = f(58, "bold")
        d.text(((W - d.textlength(line, font=fo)) / 2, 280 + i * 70), line, font=fo, fill=TEXT)

    t = "Free exports can carry a watermark."
    fo = f(27)
    d.text(((W - d.textlength(t, font=fo)) / 2, 440), t, font=fo, fill=DIM)

    feats = ["No ads", "Clean Photos saves", "Unlimited AR allowance"]
    for i, ft in enumerate(feats):
        y = 528 + i * 96
        d.rounded_rectangle([40, y, W - 40, y + 78], radius=22, fill=(24, 32, 30))
        d.ellipse([70, y + 20, 108, y + 58], fill=GREEN)
        d.line([79, y + 39, 87, y + 48], fill=(6, 30, 24), width=5)
        d.line([87, y + 48, 100, y + 30], fill=(6, 30, 24), width=5)
        d.text((134, y + 22), ft, font=f(32, "medium"), fill=TEXT)

    plans = [("Weekly", "$1.99", False), ("Monthly", "$5.99", False), ("Yearly", "$39.99", True)]
    for i, (name, price, best) in enumerate(plans):
        y = 852 + i * 118
        d.rounded_rectangle(
            [40, y, W - 40, y + 104],
            radius=24,
            fill=(20, 44, 38) if best else (24, 26, 28),
            outline=GREEN if best else (48, 52, 54),
            width=3,
        )
        d.text((72, y + 18), name, font=f(32, "bold"), fill=TEXT)
        if best:
            d.rounded_rectangle([72, y + 56, 232, y + 86], radius=15, fill=GREEN)
            d.text((88, y + 60), "BEST VALUE", font=f(20, "bold"), fill=(6, 30, 24))
        fo = f(34, "bold")
        d.text((W - 72 - d.textlength(price, font=fo), y + 34), price, font=fo, fill=GREEN_HI if best else TEXT)

    d.rounded_rectangle([40, 1246, W - 40, 1346], radius=22, fill=(250, 250, 250))
    t = "Start FrameGuide Pro"
    fo = f(34, "bold")
    d.text(((W - d.textlength(t, font=fo)) / 2, 1279), t, font=fo, fill=(10, 18, 17))

    t = "Sign in with Apple keeps Pro synced. No passwords."
    fo = f(24)
    d.text(((W - d.textlength(t, font=fo)) / 2, 1382), t, font=fo, fill=DIM)
    home_bar(d)
    return img


OUT = {
    "hero": screen_ar,
    "thirds": screen_thirds,
    "scene": screen_scene,
    "album": screen_album,
    "pro": screen_pro,
}

if __name__ == "__main__":
    import sys

    dest = sys.argv[1] if len(sys.argv) > 1 else "."
    for name, fn in OUT.items():
        im = fn()
        assert im.size == (W, H), (name, im.size)
        im.save(f"{dest}/{name}.webp", "WEBP", quality=88, method=6)
        im.save(f"{dest}/_preview_{name}.png")
        print("wrote", name)
