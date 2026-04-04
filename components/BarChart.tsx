interface BarChartProps {
  data: { label: string; value: number; color: string }[];
  maxValue?: number;
}

export function BarChart({ data, maxValue }: BarChartProps) {
  const max = maxValue ?? Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="flex items-end gap-1.5 sm:gap-2 h-40">
      {data.map((d, i) => {
        const height = Math.max((d.value / max) * 100, 4);
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
            <span className="text-[10px] font-bold tabular-nums text-zinc-400">{d.value.toFixed(1)}</span>
            <div
              className="w-full rounded-t-lg transition-all duration-500 ease-out"
              style={{ height: `${height}%`, backgroundColor: d.color }}
            />
            <span className="text-[9px] text-zinc-600 truncate w-full text-center">{d.label}</span>
          </div>
        );
      })}
    </div>
  );
}
