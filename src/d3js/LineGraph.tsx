import * as d3 from "d3";
import { useRef, useEffect, useState } from "react";

type LineGraphProps = {
    data: number[];
    title?: string;
    xLabel?: string;
    yLabel?: string;
    height: number;
};

const margin = { top: 40, right: 30, bottom: 50, left: 60 };

export default function LineGraph({
    data,
    title = "Line Graph",
    xLabel = "X Axis",
    yLabel = "Y Axis",
    height,
}: LineGraphProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);
    const [tooltip, setTooltip] = useState<{ x: number; y: number; value: number } | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const observer = new ResizeObserver(entries => {
            for (const entry of entries) {
                setWidth(entry.contentRect.width);
            }
        });
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    const x = d3.scaleLinear().domain([0, data.length - 1]).range([margin.left, width - margin.right]);
    const yDomain = d3.extent(data) as [number, number];
    const y = d3.scaleLinear().domain(yDomain[0] !== undefined ? yDomain : [0, 1]).range([height - margin.bottom, margin.top]);
    const lineGenerator = d3.line<number>().x((_, i) => x(i)).y(d => y(d));

    const xTicks = x.ticks(Math.min(10, data.length));
    const yTicks = y.ticks(10);

    return (
        <div ref={containerRef} className="w-full">
            {title && <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>}
            <svg
                width={width}
                height={height}
                style={{ background: 'white' }}>
                <g>
                    <line x1={margin.left} y1={height - margin.bottom} x2={width - margin.right} y2={height - margin.bottom} stroke="#334155" strokeWidth={2} />
                    {xTicks.map((tick, idx) => (
                        <g key={idx}>
                            <line x1={x(tick)} y1={height - margin.bottom} x2={x(tick)} y2={height - margin.bottom + 6} stroke="#64748b" strokeWidth={1} className="opacity-60" />
                            <text x={x(tick)} y={height - margin.bottom + 20} textAnchor="middle" fontSize={12} fill="#64748b" className="font-mono select-none">{tick}</text>
                        </g>
                    ))}
                    <text x={(width) / 2} y={height - margin.bottom + 35} textAnchor="middle" fontSize={14} fill="#334155" className="font-sans select-none">{xLabel}</text>
                </g>

                <g>
                    <line x1={margin.left} y1={margin.top} x2={margin.left} y2={height - margin.bottom} stroke="#334155" strokeWidth={2} className="opacity-80" />
                    {yTicks.map((tick, idx) => (
                        <g key={idx}>
                            <line x1={margin.left - 6} y1={y(tick)} x2={margin.left} y2={y(tick)} stroke="#64748b" strokeWidth={1} className="opacity-60" />
                            <text x={margin.left - 10} y={y(tick) + 4} textAnchor="end" fontSize={12} fill="#64748b" className="font-mono select-none">{tick}</text>
                        </g>
                    ))}
                    <text transform={`translate(${margin.left - 40}, ${height / 2}) rotate(-90)`} fontSize={14} fill="#334155" className="font-sans select-none">{yLabel}</text>
                </g>

                <path d={lineGenerator(data) || ""} fill="none" stroke="#2563eb" strokeWidth={2.5} className="transition-all duration-300" />

                <g>
                    {data.map((d, i) => (
                        <circle
                            key={i}
                            cx={x(i)}
                            cy={y(d)}
                            r={4}
                            fill="#fff"
                            stroke="#2563eb"
                            strokeWidth={2}
                            className="hover:fill-blue-200 transition-colors duration-200 cursor-pointer"
                            onMouseEnter={e => setTooltip({ x: e.clientX, y: e.clientY, value: d })}
                            onMouseLeave={() => setTooltip(null)}
                        />
                    ))}
                </g>
            </svg>
            {tooltip && (
                <div className="absolute bg-gray-800 text-white text-xs rounded p-2 pointer-events-none shadow-lg"
                    style={{ top: tooltip.y - containerRef.current!.getBoundingClientRect().top + 10, left: tooltip.x - containerRef.current!.getBoundingClientRect().left + 10 }}>
                    {tooltip.value}
                </div>
            )}
        </div>
    );
}
