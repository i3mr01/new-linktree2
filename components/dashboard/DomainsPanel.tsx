"use client";

import { useEffect, useState } from "react";

type Domain = {
  id: string;
  domain: string;
  status: "PENDING" | "VERIFIED";
  verificationToken: string;
};

export default function DomainsPanel() {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/domains");
      const json = await res.json();
      setDomains(json.domains || []);
    })();
  }, []);

  async function addDomain() {
    setLoading(true);
    const res = await fetch("/api/domains", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ domain: value }) });
    const json = await res.json();
    setLoading(false);
    if (res.ok) setDomains((d) => [json.domain, ...d]);
  }

  async function verify(id: string) {
    const res = await fetch(`/api/domains/${id}/verify`, { method: "POST" });
    const json = await res.json();
    if (json.verified) {
      setDomains((ds) => ds.map((d) => (d.id === id ? { ...d, status: "VERIFIED" } : d)));
    }
  }

  return (
    <section className="card p-4 space-y-4" aria-label="Custom domains">
      <h2 className="font-medium">Custom Domains</h2>
      <div className="flex gap-2">
        <input className="flex-1 rounded-md border border-[hsl(var(--border))] bg-transparent px-3 py-2" placeholder="yourdomain.com" value={value} onChange={(e) => setValue(e.target.value)} />
        <button className="btn-primary" onClick={addDomain} disabled={loading}>Add</button>
      </div>

      <div className="space-y-3">
        {domains.map((d) => (
          <div key={d.id} className="rounded-md border border-[hsl(var(--border))] p-3">
            <div className="flex items-center justify-between">
              <div className="font-medium">{d.domain}</div>
              <div className={`text-sm ${d.status === 'VERIFIED' ? 'text-green-600' : 'text-yellow-600'}`}>{d.status}</div>
            </div>
            {d.status === "PENDING" ? (
              <div className="mt-2 text-sm">
                <p className="text-muted-foreground">Add this DNS TXT record, then click Verify:</p>
                <pre className="mt-2 rounded bg-[hsl(var(--muted))] p-2 overflow-auto"><code>
Host: @
Type: TXT
Value: linkflow-verification={d.verificationToken}
</code></pre>
                <p className="mt-2">Cloudflare: DNS → Add record → TXT → Name: @ → Content as above → Save. Other providers are similar.</p>
                <button className="btn-outline mt-2" onClick={() => verify(d.id)}>Verify</button>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}


