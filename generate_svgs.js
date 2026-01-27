
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, 'public');

// Helper to create an SVG string
const createOilSvg = (label, color) => `
<svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="400" fill="#f8fafc" />
  <circle cx="300" cy="200" r="150" fill="${color}20" />
  <path d="M300 100 L340 140 L340 300 Q340 340 300 340 Q260 340 260 300 L260 140 Z" fill="${color}" stroke="#334155" stroke-width="2"/>
  <rect x="280" y="80" width="40" height="20" fill="#334155" />
  <text x="300" y="380" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#334155" text-anchor="middle">${label}</text>
</svg>
`;

const createFruitSvg = (label, color) => `
<svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="400" fill="#f8fafc" />
  <circle cx="300" cy="200" r="120" fill="${color}20" />
  <circle cx="280" cy="220" r="60" fill="${color}" />
  <circle cx="340" cy="190" r="50" fill="${color}" opacity="0.8"/>
  <circle cx="250" cy="180" r="40" fill="${color}" opacity="0.6"/>
  <text x="300" y="380" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#334155" text-anchor="middle">${label}</text>
</svg>
`;

const products = [
    // Oils (Color: Yellow/Gold/Amber variants)
    { name: 'castor-oil.svg', label: 'Castor Oil', type: 'oil', color: '#fbbf24' },
    { name: 'groundnut-oil.svg', label: 'Groundnut Oil', type: 'oil', color: '#eab308' },
    { name: 'mustard-oil.svg', label: 'Mustard Oil', type: 'oil', color: '#ca8a04' },
    { name: 'sunflower-oil.svg', label: 'Sunflower Oil', type: 'oil', color: '#facc15' },
    { name: 'almond-oil.svg', label: 'Almond Oil', type: 'oil', color: '#fdba74' },
    { name: 'safflower-oil.svg', label: 'Safflower Oil', type: 'oil', color: '#f59e0b' },

    // Dry Fruits (Color: Brown/Red variants)
    { name: 'dates-black.svg', label: 'Black Dates', type: 'fruit', color: '#3f2c22' },
    { name: 'dates-white.svg', label: 'White Dates', type: 'fruit', color: '#9a3412' },
    { name: 'walnuts.svg', label: 'Walnuts', type: 'fruit', color: '#78350f' },
    { name: 'raisins-black.svg', label: 'Black Raisins', type: 'fruit', color: '#1a1a1a' },
    { name: 'raisins-golden.svg', label: 'Golden Raisins', type: 'fruit', color: '#d97706' },
    { name: 'apricots.svg', label: 'Dried Apricots', type: 'fruit', color: '#ea580c' },
    { name: 'figs.svg', label: 'Dry Figs', type: 'fruit', color: '#57534e' },
];

products.forEach(p => {
    const svgContent = p.type === 'oil'
        ? createOilSvg(p.label, p.color)
        : createFruitSvg(p.label, p.color);

    fs.writeFileSync(path.join(publicDir, p.name), svgContent.trim());
    console.log(`Created ${p.name}`);
});
