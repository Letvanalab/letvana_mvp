# 🎨 Figma to Tailwind Color Extraction Guide

This guide walks you through the process of extracting colors from your Figma design and implementing them in your Tailwind CSS design system.

## 📋 **Step 1: Prepare Your Figma File**

1. **Open your Figma design file**
2. **Identify the main design components:**
   - Buttons
   - Text elements
   - Backgrounds
   - Borders
   - Icons
   - Interactive states (hover, active, disabled)

## 🔍 **Step 2: Extract Primary Colors**

### **Brand/Primary Colors**
1. **Select your main brand color element** (usually buttons, links, or highlights)
2. **Copy the hex code** from the color picker
3. **Note the color name** (e.g., "Primary Blue", "Brand Green")

### **Example Extraction:**
```
Primary Button: #3B82F6 → primary-500
Primary Button Hover: #2563EB → primary-600
Primary Button Active: #1D4ED8 → primary-700
```

## 🎯 **Step 3: Extract Color Scale**

For each main color, extract the full scale:

### **Method 1: Use Figma's Color Styles**
1. **Right-click on a color** → "Create Color Style"
2. **Name it systematically** (e.g., "Primary/50", "Primary/100")
3. **Create variations** for different shades

### **Method 2: Manual Scale Creation**
1. **Start with your base color** (e.g., #3B82F6)
2. **Create lighter shades** by increasing lightness:
   - 50: Very light (backgrounds, subtle highlights)
   - 100: Light (borders, backgrounds)
   - 200: Medium light (hover states)
   - 300: Light medium (secondary elements)
   - 400: Medium (accent elements)
   - **500: Base color** (main elements)
   - 600: Medium dark (hover states)
   - 700: Dark (active states)
   - 800: Darker (focus states)
   - 900: Very dark (text on light backgrounds)
   - 950: Darkest (text on very light backgrounds)

## 🔧 **Step 4: Update Design Tokens**

1. **Open `src/lib/design-tokens.ts`**
2. **Replace the color values** with your extracted colors:

```typescript
export const colors = {
  primary: {
    50: '#YOUR_COLOR_50',   // Replace with actual values
    100: '#YOUR_COLOR_100',
    200: '#YOUR_COLOR_200',
    300: '#YOUR_COLOR_300',
    400: '#YOUR_COLOR_400',
    500: '#YOUR_BASE_COLOR', // Your main brand color
    600: '#YOUR_COLOR_600',
    700: '#YOUR_COLOR_700',
    800: '#YOUR_COLOR_800',
    900: '#YOUR_COLOR_900',
    950: '#YOUR_COLOR_950',
  },
  // ... other colors
}
```

## 🎨 **Step 5: Extract Semantic Colors**

### **Success Colors**
- **Look for:** Success messages, checkmarks, positive feedback
- **Extract:** Green variations
- **Use for:** Success states, confirmations, positive actions

### **Warning Colors**
- **Look for:** Warning messages, caution indicators
- **Extract:** Yellow/Orange variations
- **Use for:** Warnings, attention, pending states

### **Error Colors**
- **Look for:** Error messages, delete buttons, destructive actions
- **Extract:** Red variations
- **Use for:** Errors, destructive actions, critical states

### **Neutral Colors**
- **Look for:** Text, borders, backgrounds, disabled states
- **Extract:** Gray variations
- **Use for:** Text, borders, backgrounds, disabled states

## 📱 **Step 6: Extract Component-Specific Colors**

### **Button Colors**
```
Primary Button: #3B82F6
Primary Button Hover: #2563EB
Primary Button Active: #1D4ED8
Secondary Button: #64748B
Secondary Button Hover: #475569
```

### **Text Colors**
```
Heading Text: #1F2937
Body Text: #374151
Muted Text: #6B7280
Link Text: #3B82F6
```

### **Background Colors**
```
Page Background: #FFFFFF
Card Background: #F9FAFB
Modal Background: #FFFFFF
Sidebar Background: #F3F4F6
```

## 🔄 **Step 7: Update CSS Variables**

1. **Open `src/index.css`**
2. **Update the color variables** with your extracted values:

```css
@theme inline {
  /* Primary Colors */
  --color-primary-50: #YOUR_COLOR_50;
  --color-primary-100: #YOUR_COLOR_100;
  --color-primary-200: #YOUR_COLOR_200;
  --color-primary-300: #YOUR_COLOR_300;
  --color-primary-400: #YOUR_COLOR_400;
  --color-primary-500: #YOUR_BASE_COLOR;
  --color-primary-600: #YOUR_COLOR_600;
  --color-primary-700: #YOUR_COLOR_700;
  --color-primary-800: #YOUR_COLOR_800;
  --color-primary-900: #YOUR_COLOR_900;
  --color-primary-950: #YOUR_COLOR_950;
  
  /* Success Colors */
  --color-success-500: #YOUR_SUCCESS_COLOR;
  
  /* Warning Colors */
  --color-warning-500: #YOUR_WARNING_COLOR;
  
  /* Error Colors */
  --color-error-500: #YOUR_ERROR_COLOR;
}
```

## 🧪 **Step 8: Test Your Colors**

1. **Run your development server**
2. **Navigate to the ColorPalette component** to see all colors
3. **Test in different contexts:**
   - Light and dark themes
   - Different component states
   - Accessibility (contrast ratios)

## 📚 **Step 9: Document Your Color System**

### **Create a Color Usage Guide:**
```markdown
## Color Usage Guidelines

### Primary Colors
- **primary-500**: Main brand color, primary buttons, links
- **primary-600**: Hover states for primary elements
- **primary-700**: Active/focus states
- **primary-50**: Very light backgrounds, subtle highlights

### Semantic Colors
- **success-500**: Success messages, confirmations
- **warning-500**: Warning messages, attention
- **error-500**: Error messages, destructive actions

### Neutral Colors
- **neutral-900**: Primary text
- **neutral-600**: Secondary text
- **neutral-200**: Borders, dividers
- **neutral-50**: Backgrounds, subtle highlights
```

## 🎯 **Step 10: Maintain Consistency**

### **Best Practices:**
1. **Use semantic naming** (success, warning, error) instead of color names
2. **Maintain consistent contrast ratios** (WCAG AA compliance)
3. **Limit your color palette** to avoid overwhelming users
4. **Use color scales** for consistent variations
5. **Test accessibility** with color blindness simulators

### **Regular Updates:**
1. **Review colors quarterly** with your design team
2. **Update tokens** when Figma designs change
3. **Maintain version control** of your color system
4. **Document changes** in your design system

## 🚀 **Quick Start Template**

Here's a quick template to get you started:

```typescript
// Replace these with your actual Figma colors
export const colors = {
  primary: {
    50: '#F0F9FF',   // Very light blue background
    100: '#E0F2FE',  // Light blue background
    200: '#BAE6FD',  // Light blue border
    300: '#7DD3FC',  // Light blue accent
    400: '#38BDF8',  // Medium blue
    500: '#0EA5E9',  // Your main brand color
    600: '#0284C7',  // Hover state
    700: '#0369A1',  // Active state
    800: '#075985',  // Focus state
    900: '#0C4A6E',  // Dark text
    950: '#082F49',  // Darkest text
  },
  // Add your other colors here...
}
```

## 🔍 **Troubleshooting**

### **Common Issues:**
1. **Colors look different in browser:** Check if you're using the correct color space (hex, RGB, HSL)
2. **Dark mode issues:** Ensure you have proper dark mode color mappings
3. **Accessibility problems:** Use tools like WebAIM's contrast checker
4. **Inconsistent appearance:** Verify all team members are using the same color values

### **Tools to Help:**
- **Figma Dev Mode:** Shows exact CSS values
- **Color Contrast Checker:** WebAIM, Stark, or browser dev tools
- **Color Palette Generators:** Coolors, Adobe Color
- **Accessibility Tools:** axe DevTools, Lighthouse

---

**Remember:** A good color system is not just about aesthetics—it's about usability, accessibility, and maintaining consistency across your entire application. Take the time to get it right, and it will pay dividends in the long run! 🎨✨
