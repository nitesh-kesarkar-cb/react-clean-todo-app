import { Pie } from '@visx/shape'
import { Group } from '@visx/group'
import { scaleOrdinal } from '@visx/scale'
import { useEffect, useRef, useState } from 'react'

type DonutChartProps = {
    title?: string
    height: number
    data: {
        name: string
        value: number
    }[]
    colors?: string[]
}

const DEFAULT_COLORS = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#A28EFF',
    '#FF6699',
    '#33CC99',
    '#FF6666',
    '#FFCC00',
    '#66CCCC',
]

export default function DonutChart({
    height,
    data,
    colors,
    title = 'Donut Chart',
}: DonutChartProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [width, setContainerWidth] = useState<number>(0)
    const innerRadiusRatio = 0.4

    useEffect(() => {
        const wrapper = containerRef.current
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
    const radius = Math.min(width, height) / 2 - 10
    const colorScale = scaleOrdinal({
        domain: data.map((d) => d.name),
        range: colors ?? DEFAULT_COLORS,
    })

    return (
        <div ref={containerRef} className="w-full">
            {title && (
                <h3 className="text-lg font-semibold mb-4 text-center">
                    {title}
                </h3>
            )}
            <svg
                width={width}
                height={height}
                style={{ background: 'white' }}
                data-testid="donut-graph-svg-visx"
            >
                <Group top={height / 2} left={width / 2}>
                    <Pie
                        data={data}
                        pieValue={(d) => d.value}
                        outerRadius={radius}
                        innerRadius={radius * innerRadiusRatio}
                        cornerRadius={3}
                        padAngle={0.01}
                        startAngle={-(3 * Math.PI) / 4}
                        endAngle={(3 * Math.PI) / 4}
                    >
                        {(pie) =>
                            pie.arcs.map((arc) => {
                                const path = pie.path(arc) ?? undefined
                                const [centroidX, centroidY] =
                                    pie.path.centroid(arc)
                                return (
                                    <g key={arc.data.name}>
                                        <path
                                            d={path}
                                            fill={colorScale(arc.data.name)}
                                        />
                                        {arc.endAngle - arc.startAngle >
                                            0.3 && (
                                            <text
                                                x={centroidX}
                                                y={centroidY}
                                                dy=".33em"
                                                fill="white"
                                                fontSize={10}
                                                textAnchor="middle"
                                            >
                                                {arc.data.name}
                                            </text>
                                        )}
                                    </g>
                                )
                            })
                        }
                    </Pie>
                </Group>
            </svg>
        </div>
    )
}
