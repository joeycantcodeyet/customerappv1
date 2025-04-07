
# Treez Platform UI Design System & Brand Guidelines

## Overview
This document serves as the foundational design specification for building the Treez application UI. It defines the color palette, typography, component styling, layout structure, and interaction principles. It is designed to enable consistency, accessibility, and ease of implementation across all parts of the product.

---

## 1. Color System

### Primary Palette
| Name             | HEX       | RGB            | Usage                                     |
|------------------|-----------|----------------|-------------------------------------------|
| Treez Green      | #295c07   | (41, 92, 7)     | Primary brand color, buttons, CTAs        |
| Treez Green Dark | #265b07   | (38, 91, 7)     | Hover states, active state emphasis       |

### Neutral Palette
| Name                | HEX       | RGB              | Usage                                        |
|---------------------|-----------|------------------|----------------------------------------------|
| White               | #ffffff   | (255, 255, 255)   | Backgrounds, card containers                  |
| Light Grey 1        | #fdfdfd   | (253, 253, 253)   | Light background variants                    |
| Light Grey 2        | #fefefe   | (254, 254, 254)   | Card backgrounds, subtle section separation  |
| Light Grey Accent   | #f7f7f7   | (247, 247, 247)   | Borders, dividers, subtle button outlines    |

### Accent Colors
| Name           | HEX       | Usage                       |
|----------------|-----------|-----------------------------|
| Warning Amber  | #fbbf24   | Onboarding status label     |
| Alert Red      | #ef4444   | Errors, validation alerts   |
| Info Blue      | #3b82f6   | Informational messages      |
| Success Green  | #10b981   | Success badges, confirmations |
| Purple Tag     | #8b5cf6   | Tag labels (e.g. 'Product') |

---

## 2. Typography

### Font Family
- **Primary:** Inter, Roboto, or Open Sans
- **Fallbacks:** system-ui, -apple-system, sans-serif

### Font Sizes
| Role               | Size       | Weight     | Usage                             |
|--------------------|------------|------------|-----------------------------------|
| Heading XL         | 32px       | 700 Bold   | Page titles, key sections         |
| Heading L          | 24px       | 600 Bold   | Section headers                   |
| Heading M          | 18px       | 600 Bold   | Card titles, dialogs              |
| Body               | 14-16px    | 400 Normal | General copy, paragraph content   |
| Caption / Label    | 12px       | 400 Light  | Form labels, tooltips             |

### Line Height
- **Default:** 1.5x font size
- **Headings:** 1.25x

### Letter Spacing
- **Normal text:** 0
- **Uppercase labels:** 0.05em

---

## 3. Layout & Spacing

### Spacing System
Use a base spacing unit of **8px**. All spacing should be applied in multiples of 4px or 8px.

| Size        | Pixels | Use Case                  |
|-------------|--------|---------------------------|
| XS          | 4px    | Gaps between icons & text |
| S           | 8px    | Padding inside small buttons |
| M           | 16px   | Card padding, form items  |
| L           | 24px   | Section padding           |
| XL          | 32px   | Page-level gutters        |

### Grid System
- **Columns:** 12-column layout (desktop), 4–6 columns (tablet/mobile)
- **Max Width:** 1200px container
- **Gutter:** 24px (desktop), 16px (tablet)
- **Breakpoint Sizes:**
  - Mobile: < 640px
  - Tablet: 641–1024px
  - Desktop: > 1024px

---

## 4. Components

### Buttons
- **Primary (Green):**
  - Background: #295c07
  - Text: #ffffff
  - Border Radius: 8px
  - Hover: #265b07 or subtle drop shadow
  - Disabled: Light grey bg, muted text

- **Secondary:**
  - Transparent background
  - Border: 1px solid #f7f7f7
  - Text: #295c07 or neutral gray

- **Destructive:**
  - Background: #ef4444
  - Hover: #dc2626

### Cards
- Background: #ffffff
- Border Radius: 12px
- Shadow: 0 2px 4px rgba(0, 0, 0, 0.04)
- Padding: 24px

### Form Inputs
- Border: 1px solid #f7f7f7
- Focus: 1px solid #3b82f6
- Border Radius: 6px
- Font: 14px regular
- Padding: 12px

### Checkboxes & Toggles
- Default: Grey border
- Checked: #295c07 background + check icon
- Disabled: Light grey outline and text

---

## 5. Iconography & Imagery

- Style: Line-based or filled, consistent stroke width
- Color: Use green (#295c07), grey, or black for icons
- Icon Size:
  - Small: 16px
  - Medium: 24px
  - Large: 32px

- Do not mix flat and 3D icon styles

---

## 6. Interaction States

### Buttons
- **Hover:** Darker shade or slight elevation
- **Active:** Scale to 0.98 or press feedback
- **Focus:** Ring or 2px border in #3b82f6
- **Disabled:** Grayed out, no hover

### Form Inputs
- **Focus:** Highlighted border + subtle shadow
- **Validation:**
  - Success: #10b981 border
  - Error: #ef4444 border + error message below

### Modals
- Overlay: rgba(0,0,0,0.5)
- Border radius: 12px
- Padding: 24px
- Close action at top-right

---

## 7. Accessibility

- Text contrast meets WCAG AA standards
- Minimum touch target: 44x44px
- Use aria-labels for icons/buttons
- Focus traps for modal dialogs
- Avoid color-only signals (use icons/symbols)

---

## 8. Branding Notes

- Voice: Friendly, instructional, and calm
- Logo placement: Top-left (always visible on desktop)
- Page titles: Personalized greeting (e.g., "Welcome back, Alex")
- Use badges for statuses (e.g., Onboarding)

---

## 9. Implementation Ready Assets

- Tokens should be created in design system tools like Figma or exported to Tailwind / CSS-in-JS
- Base spacing, color, and type tokens to be published as global variables
- Responsive behavior must be verified across device sizes
- Use component libraries like React + Tailwind, or Vue + CSS vars
