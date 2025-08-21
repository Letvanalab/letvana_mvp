import { colors } from './design-tokens'

/**
 * Color utility functions for the design system
 */

/**
 * Calculate the relative luminance of a color
 * @param hex - Hex color string (e.g., "#3B82F6")
 * @returns Relative luminance value (0-1)
 */
export function getLuminance(hex: string): number {
    // Remove # if present
    const cleanHex = hex.replace('#', '')

    // Convert hex to RGB
    const r = parseInt(cleanHex.substr(0, 2), 16) / 255
    const g = parseInt(cleanHex.substr(2, 2), 16) / 255
    const b = parseInt(cleanHex.substr(4, 2), 16) / 255

    // Apply gamma correction
    const rGamma = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4)
    const gGamma = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4)
    const bGamma = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4)

    // Calculate relative luminance
    return 0.2126 * rGamma + 0.7152 * gGamma + 0.0722 * bGamma
}

/**
 * Calculate contrast ratio between two colors
 * @param color1 - First hex color
 * @param color2 - Second hex color
 * @returns Contrast ratio
 */
export function getContrastRatio(color1: string, color2: string): number {
    const lum1 = getLuminance(color1)
    const lum2 = getLuminance(color2)

    const lighter = Math.max(lum1, lum2)
    const darker = Math.min(lum1, lum2)

    return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Check if a color combination meets WCAG AA standards
 * @param foreground - Foreground color hex
 * @param background - Background color hex
 * @param level - WCAG level ('AA' or 'AAA')
 * @returns Object with pass status and contrast ratio
 */
export function checkWCAGCompliance(
    foreground: string,
    background: string,
    level: 'AA' | 'AAA' = 'AA'
): { passes: boolean; ratio: number; required: number } {
    const ratio = getContrastRatio(foreground, background)
    const required = level === 'AA' ? 4.5 : 7

    return {
        passes: ratio >= required,
        ratio: Math.round(ratio * 100) / 100,
        required
    }
}

/**
 * Get a color from the design system by category and shade
 * @param category - Color category (e.g., 'primary', 'success')
 * @param shade - Color shade (e.g., '500', '600')
 * @returns Hex color string or undefined if not found
 */
export function getColor(category: keyof typeof colors, shade: string): string | undefined {
    const colorCategory = colors[category]
    if (typeof colorCategory === 'object' && colorCategory !== null) {
        return (colorCategory as any)[shade]
    }
    return undefined
}

/**
 * Get all available shades for a color category
 * @param category - Color category
 * @returns Array of available shades
 */
export function getColorShades(category: keyof typeof colors): string[] {
    const colorCategory = colors[category]
    if (typeof colorCategory === 'object' && colorCategory !== null) {
        return Object.keys(colorCategory as object)
    }
    return []
}

/**
 * Generate a lighter shade of a color
 * @param hex - Base hex color
 * @param amount - Amount to lighten (0-100)
 * @returns Lighter hex color
 */
export function lightenColor(hex: string, amount: number): string {
    const cleanHex = hex.replace('#', '')
    const r = Math.min(255, parseInt(cleanHex.substr(0, 2), 16) + amount)
    const g = Math.min(255, parseInt(cleanHex.substr(2, 2), 16) + amount)
    const b = Math.min(255, parseInt(cleanHex.substr(4, 2), 16) + amount)

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

/**
 * Generate a darker shade of a color
 * @param hex - Base hex color
 * @param amount - Amount to darken (0-100)
 * @returns Darker hex color
 */
export function darkenColor(hex: string, amount: number): string {
    const cleanHex = hex.replace('#', '')
    const r = Math.max(0, parseInt(cleanHex.substr(0, 2), 16) - amount)
    const g = Math.max(0, parseInt(cleanHex.substr(2, 2), 16) - amount)
    const b = Math.max(0, parseInt(cleanHex.substr(4, 2), 16) - amount)

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

/**
 * Check if a color is light or dark
 * @param hex - Hex color string
 * @returns 'light' or 'dark'
 */
export function getColorBrightness(hex: string): 'light' | 'dark' {
    const luminance = getLuminance(hex)
    return luminance > 0.5 ? 'light' : 'dark'
}

/**
 * Get the best text color for a background
 * @param backgroundColor - Background hex color
 * @returns Recommended text color (light or dark)
 */
export function getBestTextColor(backgroundColor: string): string {
    const brightness = getColorBrightness(backgroundColor)
    return brightness === 'light' ? '#000000' : '#FFFFFF'
}

/**
 * Validate if a string is a valid hex color
 * @param hex - Hex color string to validate
 * @returns True if valid hex color
 */
export function isValidHexColor(hex: string): boolean {
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
    return hexRegex.test(hex)
}

/**
 * Convert hex color to RGB
 * @param hex - Hex color string
 * @returns RGB object
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
    const cleanHex = hex.replace('#', '')
    return {
        r: parseInt(cleanHex.substr(0, 2), 16),
        g: parseInt(cleanHex.substr(2, 2), 16),
        b: parseInt(cleanHex.substr(4, 2), 16)
    }
}

/**
 * Convert RGB to hex color
 * @param r - Red value (0-255)
 * @param g - Green value (0-255)
 * @param b - Blue value (0-255)
 * @returns Hex color string
 */
export function rgbToHex(r: number, g: number, b: number): string {
    const toHex = (n: number) => Math.max(0, Math.min(255, n)).toString(16).padStart(2, '0')
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

/**
 * Get a random color from the design system
 * @returns Random color hex string
 */
export function getRandomColor(): string {
    const categories = Object.keys(colors) as (keyof typeof colors)[]
    const randomCategory = categories[Math.floor(Math.random() * categories.length)]
    const shades = getColorShades(randomCategory)
    const randomShade = shades[Math.floor(Math.random() * shades.length)]

    const color = getColor(randomCategory, randomShade)
    return color || '#000000'
}

/**
 * Create a color palette for a specific use case
 * @param baseColor - Base color hex
 * @param useCase - Use case description
 * @returns Object with color variations
 */
export function createColorPalette(baseColor: string, useCase: string): {
    base: string
    light: string
    lighter: string
    dark: string
    darker: string
    text: string
} {
    return {
        base: baseColor,
        light: lightenColor(baseColor, 30),
        lighter: lightenColor(baseColor, 60),
        dark: darkenColor(baseColor, 30),
        darker: darkenColor(baseColor, 60),
        text: getBestTextColor(baseColor)
    }
}
