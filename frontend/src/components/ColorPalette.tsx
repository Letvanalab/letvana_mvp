import { colors } from '../lib/design-tokens'

export const ColorPalette = () => {
  const colorCategories = [
    { name: 'Primary', colors: colors.primary, description: 'Main brand colors' },
    { name: 'Secondary', colors: colors.secondary, description: 'Supporting colors' },
    { name: 'Success', colors: colors.success, description: 'Positive actions and states' },
    { name: 'Warning', colors: colors.warning, description: 'Caution and attention' },
    { name: 'Error', colors: colors.error, description: 'Errors and destructive actions' },
    { name: 'Neutral', colors: colors.neutral, description: 'Text, borders, and backgrounds' },
  ]

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Design System Color Palette</h1>
        <p className="text-lg text-muted-foreground">
          Complete color system extracted from Figma design. Use these colors consistently across your application.
        </p>
      </div>

      {colorCategories.map((category) => (
        <div key={category.name} className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-foreground mb-2">{category.name}</h2>
            <p className="text-muted-foreground">{category.description}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-11 gap-4">
            {Object.entries(category.colors).map(([shade, hex]) => (
              <div key={shade} className="text-center">
                <div
                  className="w-full h-20 rounded-lg border border-border mb-2 shadow-sm"
                  style={{ backgroundColor: hex }}
                />
                <div className="text-xs font-mono text-muted-foreground mb-1">{shade}</div>
                <div className="text-xs font-mono text-foreground">{hex}</div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Semantic Colors */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6">Semantic Colors</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg border border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-6 rounded-full bg-info" />
              <h3 className="font-semibold">Info</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-2">Used for informational content and links</p>
            <div className="font-mono text-xs text-foreground">{colors.semantic.info}</div>
          </div>

          <div className="p-6 rounded-lg border border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-6 rounded-full bg-link" />
              <h3 className="font-semibold">Link</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-2">Primary link color</p>
            <div className="font-mono text-xs text-foreground">{colors.semantic.link}</div>
          </div>

          <div className="p-6 rounded-lg border border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-6 rounded-full bg-highlight" />
              <h3 className="font-semibold">Highlight</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-2">Used for highlighting important content</p>
            <div className="font-mono text-xs text-foreground">{colors.semantic.highlight}</div>
          </div>
        </div>
      </div>

      {/* Usage Examples */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6">Usage Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg border border-border">
            <h3 className="font-semibold mb-4">Buttons</h3>
            <div className="space-y-3">
              <button className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors">
                Primary Button
              </button>
              <button className="px-4 py-2 bg-secondary-500 text-white rounded-md hover:bg-secondary-600 transition-colors">
                Secondary Button
              </button>
              <button className="px-4 py-2 bg-success-500 text-white rounded-md hover:bg-success-600 transition-colors">
                Success Button
              </button>
              <button className="px-4 py-2 bg-warning-500 text-white rounded-md hover:bg-warning-600 transition-colors">
                Warning Button
              </button>
              <button className="px-4 py-2 bg-error-500 text-white rounded-md hover:bg-error-600 transition-colors">
                Error Button
              </button>
            </div>
          </div>

          <div className="p-6 rounded-lg border border-border">
            <h3 className="font-semibold mb-4">Text Colors</h3>
            <div className="space-y-2">
              <p className="text-primary-600">Primary text color</p>
              <p className="text-secondary-600">Secondary text color</p>
              <p className="text-success-600">Success text color</p>
              <p className="text-warning-600">Warning text color</p>
              <p className="text-error-600">Error text color</p>
              <p className="text-neutral-600">Neutral text color</p>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Variables Reference */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6">CSS Variables Reference</h2>
        <div className="bg-muted p-6 rounded-lg">
          <p className="text-sm text-muted-foreground mb-4">
            Use these CSS variables in your custom CSS or as fallbacks:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-mono">
            <div>
              <p><span className="text-primary-600">--color-primary-500:</span> #3b82f6;</p>
              <p><span className="text-primary-600">--color-secondary-500:</span> #64748b;</p>
              <p><span className="text-primary-600">--color-success-500:</span> #22c55e;</p>
            </div>
            <div>
              <p><span className="text-primary-600">--color-warning-500:</span> #f59e0b;</p>
              <p><span className="text-primary-600">--color-error-500:</span> #ef4444;</p>
              <p><span className="text-primary-600">--color-neutral-500:</span> #737373;</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
