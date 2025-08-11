import * as d3 from "d3";

type LineGraphProps = {
    data: number[];
    width?: number;
    height?: number;
    marginTop?: number;
    marginRight?: number;
    marginBottom?: number;
    marginLeft?: number;
    title?: string;
    xLabel?: string;
    yLabel?: string;
};

export default function LineGraph({
    data,
    width = 640,
    height = 400,
    marginTop = 40,
    marginRight = 40,
    marginBottom = 60,
    marginLeft = 60,
    title = "Line Graph",
    xLabel = "X Axis",
    yLabel = "Y Axis"
}: LineGraphProps) {

    const x = d3.scaleLinear([0, data.length - 1], [marginLeft, width - marginRight]);
    const yDomain = d3.extent(data);
    const y = d3.scaleLinear(
        yDomain[0] !== undefined && yDomain[1] !== undefined ? yDomain as [number, number] : [0, 1],
        [height - marginBottom, marginTop]
    );
    const line = d3.line((_d, i) => x(i), y);

    const xTicks = x.ticks(10);
    const yTicks = y.ticks(10);

    return (
        <div className="p-4 flex justify-center items-center">
            <svg
                width={width}
                height={height}
                className="w-full h-auto bg-white to-blue-100 rounded-lg border border-blue-200 p-4"
            >
                <text
                    x={width / 2}
                    y={marginTop / 2}
                    textAnchor="middle"
                    fontSize={22}
                    fontWeight="bold"
                    fill="#334155"
                    className="font-sans select-none"
                >
                    {title}
                </text>

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

                <text
                    x={width / 2}
                    y={height - 15}
                    textAnchor="middle"
                    fontSize={16}
                    fill="#334155"
                    className="font-sans select-none"
                >
                    {xLabel}
                </text>

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

                <text
                    x={20}
                    y={height / 2}
                    textAnchor="middle"
                    fontSize={16}
                    fill="#334155"
                    className="font-sans select-none"
                    transform={`rotate(-90, 20, ${height / 2})`}
                >
                    {yLabel}
                </text>

                <path
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="2.5"
                    d={line(data) ?? ""}
                    className="transition-all duration-300 drop-shadow-lg"
                />
                <g>
                    {data.map((d: number, i: number) => (
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