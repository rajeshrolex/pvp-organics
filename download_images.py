"""
Download high-quality dry fruits images
Using requests library for better HTTP handling
"""

import requests
import os
from pathlib import Path

# Define image URLs from reliable sources
images = {
    "cashews.jpg": "https://source.unsplash.com/featured/1200x800/?cashews,nuts",
    "dates-black.jpg": "https://source.unsplash.com/featured/1200x800/?dates,fruit,dark",
    "dates-white.jpg": "https://source.unsplash.com/featured/1200x800/?dates,golden",
    "walnuts.jpg": "https://source.unsplash.com/featured/1200x800/?walnuts",
    "raisins-black.jpg": "https://source.unsplash.com/featured/1200x800/?raisins,dark",
    "raisins-golden.jpg": "https://source.unsplash.com/featured/1200x800/?raisins,golden",
    "apricots.jpg": "https://source.unsplash.com/featured/1200x800/?apricots,dried",
    "figs.jpg": "https://source.unsplash.com/featured/1200x800/?figs,dried"
}

public_dir = Path("public")
public_dir.mkdir(exist_ok=True)

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
}

print("🌟 Downloading dry fruits images from Unsplash...\n")

success = 0
failed = 0

for filename, url in images.items():
    print(f"📥 Downloading {filename}...")
    try:
        response = requests.get(url, headers=headers, timeout=30, allow_redirects=True)
        response.raise_for_status()
        
        filepath = public_dir / filename
        filepath.write_bytes(response.content)
        
        size_kb = len(response.content) / 1024
        print(f"   ✅ Success - {size_kb:.2f} KB\n")
        success += 1
        
    except Exception as e:
        print(f"   ❌ Failed - {str(e)}\n")
        failed += 1

print(f"\n📊 Download Summary:")
print(f"   ✅ Success: {success}/{len(images)}")
print(f"   ❌ Failed: {failed}/{len(images)}")

if success == len(images):
    print(f"\n🎉 All images downloaded successfully!")
