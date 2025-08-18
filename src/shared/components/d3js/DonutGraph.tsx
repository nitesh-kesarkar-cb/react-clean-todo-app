import { useRef, useEffect, useState } from 'react'
import * as d3 from 'd3'

interface DonutGraphProps {
    height: number
    title: string
    data: {
        name: string
        value: number
    }[]
    color?: string
}

const marginTop = 40
const marginRight = 30
const marginBottom = 40
const marginLeft = 50

export default function DonutGraph({
    title,
    data,
    height,
    color,
}: DonutGraphProps) {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const svgRef = useRef<SVGSVGElement>(null)
    const [containerWidth, setContainerWidth] = useState<number>(0)

    useEffect(() => {
        const wrapper = wrapperRef.current
        if (!wrapper) return

        const resizeObserver = new window.ResizeObserver((entries) => {
            for (const entry of entries) {
                if (entry.contentRect) {
                    setContainerWidth(entry.contentRect.width)
                }
            }
        })
        resizeObserver.observe(wrapper)

        return () => {
            resizeObserver.disconnect()
        }
    }, [])

    // Prepare chart dimensions
    const width = containerWidth
    const chartWidth = width - marginLeft - marginRight
    const chartHeight = height - marginTop - marginBottom
    const radius = Math.min(chartWidth, chartHeight) / 2 - 10
    const ringWidth = radius * 0.4
    const startAngle = -(3 * Math.PI) / 4
    const endAngle = (3 * Math.PI) / 4

    // Pie and arc generators
    const pie = d3
        .pie<{ name: string; value: number }>()
        .value((d) => d.value)
        .startAngle(startAngle)
        .endAngle(endAngle)
        .padAngle(0.02)
        .sort(null)

    const arcs = pie(data)

    const arcGen = d3
        .arc<d3.PieArcDatum<{ name: string; value: number }>>()
        .innerRadius(radius - ringWidth)
        .outerRadius(radius)

    const colorScale = color
        ? d3
              .scaleOrdinal<string>()
              .domain(data.map((d) => d.name))
              .range(Array(data.length).fill(color))
        : d3
              .scaleOrdinal<string>()
              .domain(data.map((d) => d.name))
              .range(d3.schemeCategory10)

    const total = data.reduce((sum, d) => sum + d.value, 0)

    return (
        <div ref={wrapperRef} className="w-full">
            {title && (
                <h3 className="text-lg font-semibold mb-4 text-center">
                    {title}
                </h3>
            )}

            <svg
                ref={svgRef}
                width={containerWidth || 1}
                height={height}
                style={{ background: 'white' }}
                data-testid="donut-graph-svg-d3"
            >
                <g
                    transform={`translate(${marginLeft + chartWidth / 2},${marginTop + chartHeight / 2})`}
                >
                    {arcs.map((arc) => (
                        <path
                            key={arc.data.name}
                            d={arcGen(arc) ?? undefined}
                            fill={colorScale(arc.data.name)}
                            stroke="#fff"
                            strokeWidth={2}
                            style={{
                                filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.08))',
                            }}
                        />
                    ))}
                    <text
                        textAnchor="middle"
                        dy="0.2em"
                        style={{
                            fontSize: '1.8rem',
                            fontWeight: 'bold',
                            fill: '#222',
                        }}
                    >
                        {total}
                    </text>
                </g>
            </svg>
        </div>
    )
}
