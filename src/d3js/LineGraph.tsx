import * as d3 from "d3";

export default function LinePlot({
    data,
    width = 640,
    height = 400,
    marginTop = 20,
    marginRight = 40,
    marginBottom = 40,
    marginLeft = 40
}) {
    const x = d3.scaleLinear([0, data.length - 1], [marginLeft, width - marginRight]);
    const y = d3.scaleLinear(d3.extent(data), [height - marginBottom, marginTop]);
    const line = d3.line((d, i) => x(i), y);

    // Axis ticks
    const xTicks = x.ticks(10);
    const yTicks = y.ticks(10);

    return (
        <div className="bg-white rounded-lg shadow p-4 flex justify-center items-center">
            <svg
                width={width}
                height={height}
                className="w-full h-auto bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-lg border border-blue-200 p-4"
            >
                {/* X axis */}
                <line
                    x1={marginLeft}
                    y1={height - marginBottom}
                    x2={width - marginRight}
                    y2={height - marginBottom}
                    stroke="#334155"
                    strokeWidth={2}
                    className="opacity-80"
                />
                {xTicks.map((tick, i) => (
                    <g key={i} className="text-center m-2">
                        <line
                            x1={x(tick)}
                            y1={height - marginBottom}
                            x2={x(tick)}
                            y2={height - marginBottom + 6}
                            stroke="#64748b"
                            strokeWidth={1}
                            className="opacity-60"
                        />
                        <text
                            x={x(tick)}
                            y={height - marginBottom + 20}
                            textAnchor="middle"
                            fontSize={12}
                            fill="#64748b"
                            className="font-mono select-none"
                        >
                            {tick}
                        </text>
                    </g>
                ))}

                {/* Y axis */}
                <line
                    x1={marginLeft}
                    y1={marginTop}
                    x2={marginLeft}
                    y2={height - marginBottom}
                    stroke="#334155"
                    strokeWidth={2}
                    className="opacity-80"
                />
                {yTicks.map((tick, i) => (
                    <g key={i} className="text-right m-2">
                        <line
                            x1={marginLeft - 6}
                            y1={y(tick)}
                            x2={marginLeft}
                            y2={y(tick)}
                            stroke="#64748b"
                            strokeWidth={1}
                            className="opacity-60"
                        />
                        <text
                            x={marginLeft - 10}
                            y={y(tick) + 4}
                            textAnchor="end"
                            fontSize={12}
                            fill="#64748b"
                            className="font-mono select-none"
                        >
                            {tick}
                        </text>
                    </g>
                ))}

                {/* Line and points */}
                <path
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="2.5"
                    d={line(data)}
                    className="transition-all duration-300 drop-shadow-lg"
                />
                <g>
                    {data.map((d, i) => (
                        <circle
                            key={i}
                            cx={x(i)}
                            cy={y(d)}
                            r="4"
                            fill="#fff"
                            stroke="#2563eb"
                            strokeWidth="2"
                            className="hover:fill-blue-200 transition-colors duration-200 shadow-md"
                        />
                    ))}
                </g>
            </svg>
        </div>
    );
}