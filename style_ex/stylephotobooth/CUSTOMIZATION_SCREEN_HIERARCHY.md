# CustomizationScreen Right Panel - Typography & Hierarchy Guide

## 📐 Typography System

### H1 - Main Section Title
- **Font Size**: `text-lg` (18px)
- **Font Weight**: `800`
- **Usage**: Top-level section titles (currently only used in Holiday tab)
- **Example**: "Holiday Themes"

### H2 - Section Title
- **Font Size**: `text-base` (16px)  
- **Font Weight**: `700`
- **Color**: `text-gray-800`
- **Usage**: Major functional sections within each tab
- **Example**: "Background Color", "Photo Position", "Border Width", "Brush Type"

### H3 - Sub-section Title
- **Font Size**: `text-sm` (14px)
- **Font Weight**: `700`
- **Color**: `text-gray-700`
- **Usage**: Sub-components within a major section
- **Example**: "Custom Color" (under Background Color or Draw Color)

### Labels & Captions
- **Font Size**: `text-xs` (12px)
- **Font Weight**: `500-600`
- **Usage**: Small descriptive text, slider labels, helper text

---

## 🗂️ Tab Structure & Hierarchy

### 🎉 HOLIDAY Tab
```
└─ H1: Holiday Themes
   ├─ Description (caption)
   └─ Holiday theme buttons
```

### 🖼️ BACKGROUND Tab
```
├─ H2: Photo Position
│  ├─ Reset button (inline)
│  └─ Zoom slider (with label)
│
├─ H2: Background Color
│  ├─ Color preset grid
│  └─ H3: Custom Color
│     └─ Color wheel picker
│
├─ H2: Border Width: {value}px
│  └─ Slider
│
└─ H2: Panel Spacing: {value}px
   └─ Slider
```

### 🎨 DECORATIONS Tab
```
└─ H2: Pattern
   └─ Pattern grid
```

### 🌟 STICKERS Tab
```
└─ H2: Add Stickers
   ├─ Sticker grid
   └─ Caption (helper text)
```

### ✏️ DRAW Tab
```
├─ H2: Brush Type
│  └─ Brush type grid
│
├─ H2: Draw Color
│  ├─ Color preset grid
│  └─ H3: Custom Color
│     └─ Color wheel picker
│
├─ H2: Brush Size: {value}px
│  └─ Slider
│
├─ Action buttons row
│  ├─ Eraser toggle
│  └─ Undo button
│
└─ Clear Drawing button
```

---

## ✅ Design Principles Applied

1. **No Icons/Emojis in Titles**: Section titles are clean text only
   - ❌ "📸 Photo Position" 
   - ✅ "Photo Position"
   
2. **Consistent Hierarchy**: All major sections within a tab use H2
   - Photo Position = H2 (same level as Background Color)
   - Background Color = H2
   - Border Width = H2
   - Panel Spacing = H2

3. **Sub-sections Use H3**: Nested components within a section
   - Custom Color (under Background Color) = H3
   - Custom Color (under Draw Color) = H3

4. **Typography Scale**: Clear visual hierarchy through size
   - H1 (18px) > H2 (16px) > H3 (14px) > Labels (12px)

5. **Font Family Consistency**: All use 'Nunito' sans-serif

---

## 🎯 Quick Reference

| Element Type | Size Class | Weight | Color |
|--------------|-----------|--------|-------|
| Main Title (H1) | text-lg | 800 | gray-900 |
| Section Title (H2) | text-base | 700 | gray-800 |
| Sub-section (H3) | text-sm | 700 | gray-700 |
| Label | text-xs | 600 | gray-600 |
| Caption | text-xs | 500 | gray-500 |

---

*Last updated: 2026-02-26*
*All sections maintain consistent spacing (space-y-4) between major elements*
