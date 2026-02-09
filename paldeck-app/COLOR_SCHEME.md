# 🎨 PalDeck Pastel Color Scheme

## Color Palette Overview

PalDeck now features a beautiful **pastel dark mode** aesthetic with soft, cool colors that are easy on the eyes while maintaining a modern, premium feel.

---

## 🌈 Primary Colors

### Pastel Gradients
```css
--primary-gradient: linear-gradient(135deg, #b8a4e8 0%, #d4a5d8 100%);
/* Soft lavender to light purple */

--secondary-gradient: linear-gradient(135deg, #ffc4e1 0%, #ffb3d9 100%);
/* Pastel pink gradient */

--success-gradient: linear-gradient(135deg, #a8e6cf 0%, #b8f3e0 100%);
/* Mint green gradient */

--accent-gradient: linear-gradient(135deg, #ffd4a3 0%, #ffe5b4 100%);
/* Peach gradient */

--cool-gradient: linear-gradient(135deg, #c4d7f2 0%, #d4e5f7 100%);
/* Sky blue gradient */
```

### Solid Pastel Colors
```css
--primary: #b8a4e8;        /* Lavender */
--secondary: #d4a5d8;      /* Light purple */
--accent: #ffc4e1;         /* Pastel pink */
--success: #a8e6cf;        /* Mint green */
--mint: #b8f3e0;           /* Light mint */
--peach: #ffd4a3;          /* Peach */
--sky: #c4d7f2;            /* Sky blue */
--lavender: #d4c5f9;       /* Light lavender */
```

---

## 🌙 Dark Mode Backgrounds

### Deep but Soft Backgrounds
```css
--bg-primary: #1a1625;     /* Deep purple-black */
--bg-secondary: #251e35;   /* Soft dark purple */
--bg-tertiary: #2d2640;    /* Medium dark purple */
```

### Translucent Overlays
```css
--bg-card: rgba(184, 164, 232, 0.08);         /* Subtle lavender tint */
--bg-card-hover: rgba(184, 164, 232, 0.15);   /* Hover state */
```

---

## 📝 Text Colors

```css
--text-primary: #f5f3ff;                    /* Soft white with purple tint */
--text-secondary: rgba(245, 243, 255, 0.75); /* 75% opacity */
--text-tertiary: rgba(245, 243, 255, 0.5);   /* 50% opacity */
```

---

## ✨ Borders & Shadows

### Borders
```css
--border-color: rgba(184, 164, 232, 0.15);  /* Subtle lavender border */
```

### Shadows
```css
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
--shadow-md: 0 4px 16px rgba(0, 0, 0, 0.4);
--shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.5);
--shadow-glow: 0 0 20px rgba(184, 164, 232, 0.25);      /* Lavender glow */
--shadow-pastel: 0 4px 20px rgba(184, 164, 232, 0.2);   /* Pastel shadow */
```

---

## 🎯 Component-Specific Colors

### Splash Screen
- **Background**: Lavender → Light Purple → Pastel Pink gradient
- **Effect**: Dreamy, welcoming first impression

### Swipe Cards
- **Like Button**: Mint green gradient (#a8e6cf → #b8f3e0)
- **Pass Button**: Pastel pink gradient (#ffc4e1 → #ffb3d9)
- **Interest Tags**: Lavender with soft glow

### Match Modal
- **Title**: Lavender to Pink gradient
- **Avatar Border**: Soft lavender (#b8a4e8)
- **Background**: Deep purple with lavender border

### Chat
- **Sent Messages**: Lavender to Light Purple gradient
- **Online Status**: Mint green (#a8e6cf)
- **Send Button**: Lavender gradient

### Bottom Navigation
- **Background**: Medium dark purple (#2d2640)
- **Active State**: Lavender (#b8a4e8)
- **Badge**: Pastel pink (#ffc4e1)

### Filters Modal
- **Range Sliders**: Lavender gradient thumbs
- **Background**: Soft dark purple with lavender accents

---

## 🎨 Design Philosophy

### Why Pastel Colors?

1. **Eye Comfort**: Softer than vibrant colors, easier on the eyes during extended use
2. **Modern Aesthetic**: Trendy, Instagram-worthy color palette
3. **Emotional Appeal**: Calming, friendly, approachable feel
4. **Dark Mode Friendly**: Works beautifully with dark backgrounds
5. **Gender Neutral**: Appeals to all users without being too masculine or feminine

### Color Psychology

- **Lavender (#b8a4e8)**: Calm, creative, friendly
- **Mint (#a8e6cf)**: Fresh, positive, success
- **Pastel Pink (#ffc4e1)**: Warm, affectionate, playful
- **Peach (#ffd4a3)**: Friendly, inviting, comfortable
- **Sky Blue (#c4d7f2)**: Trustworthy, peaceful, open

---

## 🌟 Visual Hierarchy

### Primary Actions
- Use **lavender gradient** (#b8a4e8 → #d4a5d8)
- Examples: Primary buttons, active states, selected items

### Success/Positive Actions
- Use **mint gradient** (#a8e6cf → #b8f3e0)
- Examples: Like button, success messages, online status

### Secondary/Neutral Actions
- Use **pastel pink** (#ffc4e1)
- Examples: Pass button, badges, accents

### Backgrounds
- **Deep purple-black** (#1a1625) for main background
- **Soft dark purple** (#251e35) for cards and modals
- **Medium dark purple** (#2d2640) for navigation

---

## 💡 Usage Guidelines

### Do's ✅
- Use pastel gradients for primary interactive elements
- Maintain soft, subtle borders with lavender tint
- Use mint green for positive feedback
- Keep backgrounds deep but with purple undertones
- Add subtle lavender glows to important elements

### Don'ts ❌
- Don't use pure white (#ffffff) - use soft white (#f5f3ff)
- Don't use harsh black (#000000) - use deep purple-black (#1a1625)
- Don't mix vibrant colors with pastels
- Don't use high contrast - keep it soft and harmonious
- Don't overuse bright accent colors

---

## 🎭 Accessibility

### Contrast Ratios
- **Text on dark background**: 15:1 (Excellent)
- **Pastel on dark background**: 8:1 (Good)
- **Borders**: Subtle but visible

### Color Blindness Considerations
- Pastel colors maintain good differentiation
- Mint green and lavender are distinguishable
- Pink and purple have different luminosity

---

## 🚀 Implementation Status

✅ **Completed**
- [x] CSS variables updated in `App.css`
- [x] Splash screen gradient
- [x] Onboarding screen colors
- [x] Swipe screen (cards, buttons, tags)
- [x] Match modal
- [x] Bottom navigation
- [x] Chat screens
- [x] Profile screens
- [x] Matches grid
- [x] Profile setup
- [x] Filters modal

---

## 📱 Preview

The app now features:
- **Soft lavender** as the primary brand color
- **Mint green** for positive actions (like, success)
- **Pastel pink** for secondary actions and accents
- **Deep purple-black** backgrounds for comfortable dark mode
- **Subtle glows** and shadows with lavender tints
- **Harmonious gradients** throughout the interface

---

## 🎨 Color Combinations

### Best Pairings
1. **Lavender + Mint**: Primary action + Success
2. **Lavender + Pink**: Gradient transitions
3. **Mint + Peach**: Warm and cool balance
4. **Sky Blue + Lavender**: Cool, trustworthy feel

### Avoid
- Peach + Pink (too warm together)
- All pastels at once (overwhelming)
- Pastel on pastel (low contrast)

---

**Result**: A beautiful, modern, aesthetic dark mode app with soft pastel colors that feel premium, calming, and cool! 🌸✨
