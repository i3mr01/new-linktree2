"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type AnalyticsResponse = {
  total: number;
  days: { day: string; count: number }[];
  topReferrers: { referrer: string; count: number }[];
  topDevices: { device: string; count: number }[];
};

export default function AnalyticsPage() {
  const params = useParams<{ id: string }>();
  const [data, setData] = useState<AnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetch(`/api/analytics/${params.id}`);
      const json = await res.json();
      setData(json);
      setLoading(false);
    })();
  }, [params.id]);

  if (loading) return <main className="container py-6">Loading...</main>;
  if (!data) return <main className="container py-6">No data</main>;

  return (
    <main className="container py-6 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Analytics</h1>
        <p className="text-muted-foreground">Last 30 days</p>
      </div>

      <section className="card p-4">
        <div className="text-sm text-muted-foreground">Total clicks</div>
        <div className="text-3xl font-semibold">{data.total}</div>
        <div className="h-32 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.days} margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="day" hide/>
              <YAxis hide/>
              <Tooltip formatter={(value) => [`${value}`, "Clicks"]} labelFormatter={(l) => l} />
              <Area type="monotone" dataKey="count" stroke="#2563eb" fillOpacity={1} fill="url(#spark)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-4">
        <div className="card p-4">
          <h2 className="font-medium mb-3">Top referrers</h2>
          <ul className="space-y-2 text-sm">
            {data.topReferrers.map((r) => (
              <li key={r.referrer} className="flex items-center justify-between">
                <span className="truncate max-w-[70%]" title={r.referrer}>{r.referrer}</span>
                <span className="text-muted-foreground">{r.count}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-4">
          <h2 className="font-medium mb-3">Top devices</h2>
          <ul className="space-y-2 text-sm">
            {data.topDevices.map((d) => (
              <li key={d.device} className="flex items-center justify-between">
                <span>{d.device}</span>
                <span className="text-muted-foreground">{d.count}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}


