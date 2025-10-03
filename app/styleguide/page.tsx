export default function StyleGuidePage() {
  const colors = [
    { name: "Primary", var: "--primary" },
    { name: "Secondary", var: "--secondary" },
    { name: "Accent", var: "--accent" },
    { name: "Accent2", var: "--accent2" },
    { name: "Background", var: "--background" },
    { name: "Foreground", var: "--foreground" },
  ];

  const spacings = [0, 0.5, 1, 1.5, 2, 3, 4, 6, 8, 12];

  return (
    <main className="container py-10 space-y-12">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold">Style Guide</h1>
        <p className="text-muted-foreground">Design tokens and component previews.</p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Colors</h2>
        <div className="grid xs:grid-cols-2 md:grid-cols-3 gap-4">
          {colors.map((c) => (
            <div key={c.name} className="card p-4">
              <div
                className="rounded-md h-16 w-full mb-3"
                style={{ backgroundColor: `hsl(var(${c.var}))` }}
              />
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{c.name}</span>
                <code className="text-muted-foreground">{c.var}</code>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Typography</h2>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Heading 1</h1>
          <h2 className="text-3xl font-semibold">Heading 2</h2>
          <h3 className="text-2xl font-semibold">Heading 3</h3>
          <p className="text-base">Body text – default size and leading for readability.</p>
          <p className="text-sm text-muted-foreground">Muted text for secondary content.</p>
          <a href="#" className="text-[hsl(var(--primary))] underline">Interactive link</a>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Spacing Scale</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {spacings.map((s) => (
            <div key={s} className="flex items-center gap-4">
              <div className="w-24 text-sm text-muted-foreground">{`p-${s}`}</div>
              <div className="bg-[hsl(var(--muted))] rounded-md" style={{ padding: `${s}rem` }}>
                <div className="card px-4 py-2">Content</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Components</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="font-medium">Buttons</h3>
            <div className="flex flex-wrap gap-3">
              <button className="btn-primary">Primary</button>
              <button className="btn-outline">Outline</button>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="font-medium">Link Card</h3>
            <a href="#" className="card p-4 hover:shadow-glass transition-shadow">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-primary" />
                <div>
                  <div className="font-medium">My Portfolio</div>
                  <div className="text-sm text-muted-foreground">example.com</div>
                </div>
              </div>
            </a>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium">Avatar</h3>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-[hsl(var(--muted))]" />
              <div className="h-12 w-12 rounded-2xl bg-[hsl(var(--muted))]" />
              <div className="h-12 w-12 rounded-[22px] bg-[hsl(var(--muted))] shadow-soft" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


