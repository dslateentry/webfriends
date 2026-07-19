# Typography Hierarchy Guide

This document outlines the consistent typography system used in the Photobooth app's customization panel.

## Font Family
All text uses **Nunito** (SF Pro Rounded alternative):
```tsx
style={{ fontFamily: "'Nunito', sans-serif" }}
```

## Hierarchy Levels

### H1 - Main Section Title
Used for: Top-level section titles within each tab (e.g., "Holiday Themes")
```tsx
<h2 className="text-lg mb-2 text-gray-900" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800 }}>
  Holiday Themes
</h2>
```
- **Size**: `text-lg` (18px)
- **Weight**: 800 (Extra Bold)
- **Color**: `text-gray-900` (#111827)
- **Spacing**: `mb-2` (8px bottom margin)

### H2 - Section Title
Used for: Major feature sections (e.g., "Background Color", "Pattern", "Add Stickers", "Brush Type")
```tsx
<h2 className="text-base mb-3 text-gray-800" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
  Background Color
</h2>
```
- **Size**: `text-base` (16px)
- **Weight**: 700 (Bold)
- **Color**: `text-gray-800` (#1f2937)
- **Spacing**: `mb-3` (12px bottom margin)

### H3 - Sub-section Title
Used for: Sub-features and controls (e.g., "Photo Position", "Custom Color")
```tsx
<h3 className="text-sm text-gray-700" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
  📸 Photo Position
</h3>
```
- **Size**: `text-sm` (14px)
- **Weight**: 700 (Bold)
- **Color**: `text-gray-700` (#374151)
- **Spacing**: Contextual

### Label/Body Text
Used for: Interactive labels and primary descriptive text (e.g., "Zoom", brush type names)
```tsx
<span className="text-sm text-gray-600" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 600 }}>
  Zoom
</span>
```
- **Size**: `text-sm` (14px)
- **Weight**: 600 (Semi-bold)
- **Color**: `text-gray-600` (#4b5563)

### Caption/Helper Text
Used for: Secondary information, hints, and helper text (e.g., "Tap to pick", "Click a sticker to add it")
```tsx
<p className="text-xs text-gray-500" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 500 }}>
  Click a sticker to add it, then drag to position
</p>
```
- **Size**: `text-xs` (12px)
- **Weight**: 500 (Medium)
- **Color**: `text-gray-500` (#6b7280)

## Color Palette

- **Primary Text**: `#111827` (gray-900) - H1
- **Secondary Text**: `#1f2937` (gray-800) - H2
- **Tertiary Text**: `#374151` (gray-700) - H3
- **Body Text**: `#4b5563` (gray-600) - Labels
- **Muted Text**: `#6b7280` (gray-500) - Captions

## Interactive States

### Active/Selected Items
- Use purple accent: `#7c3aed` (purple-600)
- Increase weight if needed (600→700)

### Hover States
- Use purple for interactive links: `#7c3aed` → `#6d28d9` (purple-600 → purple-700)

## Examples in Context

```tsx
{/* Tab Section */}
<TabsContent value="background" className="space-y-4">
  {/* H1 - Not commonly used in tabs, but for major sections */}
  
  {/* H3 - Small section */}
  <div className="space-y-2">
    <h3 className="text-sm text-gray-700" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
      📸 Photo Position
    </h3>
    
    {/* Label */}
    <span className="text-xs text-gray-600" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 600 }}>
      Zoom
    </span>
  </div>
  
  {/* H2 - Main section */}
  <div>
    <h2 className="text-base mb-3 text-gray-800" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
      Background Color
    </h2>
    
    {/* H3 - Subsection */}
    <span className="text-sm text-gray-700" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
      Custom Color
    </span>
    
    {/* Caption */}
    <div className="text-xs text-gray-500" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 500 }}>
      Tap to pick
    </div>
  </div>
</TabsContent>
```

## Best Practices

1. **Consistency**: Always use the same size/weight combination for the same hierarchy level
2. **Contrast**: Ensure sufficient visual hierarchy through size and weight differences
3. **Spacing**: Maintain consistent margin/padding patterns for each level
4. **Color**: Use the defined color palette to reinforce hierarchy
5. **Comments**: Add `{/* H1/H2/H3/Label/Caption */}` comments for clarity in code

## Migration Notes

- Changed H1 from `text-2xl` (24px) to `text-lg` (18px) for better proportion in sidebar
- Unified all H2 sections to `text-base` (16px)
- Standardized all H3 sections to `text-sm` (14px)
- Labels are `text-sm` (14px) with weight 600
- Captions remain `text-xs` (12px) with weight 500
