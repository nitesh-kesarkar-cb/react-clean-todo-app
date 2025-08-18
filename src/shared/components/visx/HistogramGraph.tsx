import { useEffect, useRef, useState } from 'react'
import { Group } from '@visx/group'
import { Bar } from '@visx/shape'
import { scaleLinear, scaleBand } from '@visx/scale'
import { AxisBottom, AxisLeft } from '@visx/axis'
import { useTooltip, Tooltip } from '@visx/tooltip'
import { localPoint } from '@visx/event'

interface HistogramGraphProps {
    title?: string
    data: {
        label: string
        value: number
    }[]
    height: number
    barColor?: string
}

export default function HistogramGraph({
    title,
    height,
    data = [],
    barColor = '#4f46e5', // indigo
}: HistogramGraphProps) {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const [width, setWidth] = useState(0)

    const {
        tooltipData,
        tooltipLeft,
        tooltipTop,
        tooltipOpen,
        showTooltip,
        hideTooltip,
    } = useTooltip<number>()

    // margins for axes
    const margin = { top: 20, right: 20, bottom: 60, left: 70 }

    // ResizeObserver for responsive width
    useEffect(() => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        if (rect.width) setWidth(rect.width)

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setWidth(entry.contentRect.width)
            }
        })
        observer.observe(containerRef.current)
        return () => observer.disconnect()
    }, [])

    // inner drawing bounds
    const innerWidth = Math.max(0, width - margin.left - margin.right)
    const innerHeight = Math.max(0, height - margin.top - margin.bottom)

    // scales
    const xDomain = data.map((d) => d.label)
    const maxVal = data.length > 0 ? Math.max(...data.map((d) => d.value)) : 1

    const xScale = scaleBand<string>({
        domain: xDomain,
        range: [0, innerWidth],
        padding: 0.05,
        round: true,
    })

    const yScale = scaleLinear<number>({
        domain: [0, maxVal * 1.1],
        range: [innerHeight, 0],
        round: true,
    })

    return (
        <div
            ref={containerRef}
            className="w-full"
            style={{ position: 'relative' }}
        >
            {title && (
                <div className="mb-2 font-bold text-center text-lg">
                    {title}
                </div>
            )}
            <svg
                width={Math.max(width, 0)}
                height={height}
                data-testid="bar-chart-svg-visx"
                style={{ background: 'white' }}
            >
                <Group left={margin.left} top={margin.top}>
                    {/* Bars */}
                    {data.map((d, i) => {
                        const xPos = xScale(d.label) ?? 0
                        const bw = xScale.bandwidth()
                        const barY = yScale(d.value)
                        const barHeight = innerHeight - barY

                        return (
                            <Bar
                                key={`bar-${i}`}
                                x={xPos}
                                y={barY}
                                width={bw}
                                height={barHeight}
                                rx={3}
                                ry={3}
                                fill={barColor}
                                onMouseMove={(event) => {
                                    const coords = localPoint(event)
                                    showTooltip({
                                        tooltipLeft: coords?.x,
                                        tooltipTop: coords?.y,
                                        tooltipData: d.value,
                                    })
                                }}
                                onMouseLeave={hideTooltip}
                                style={{ cursor: 'pointer' }}
                            />
                        )
                    })}

                    {/* X axis */}
                    <AxisBottom
                        top={innerHeight}
                        scale={xScale}
                        stroke="#333"
                        tickStroke="#333"
                        tickLabelProps={() => ({
                            fontSize: 11,
                            textAnchor: 'middle',
                        })}
                    />

                    {/* Y axis */}
                    <AxisLeft
                        scale={yScale}
                        stroke="#333"
                        tickStroke="#333"
                        tickLabelProps={() => ({
                            fontSize: 11,
                            dx: '-0.5em',
                            textAnchor: 'end',
                        })}
                    />

                    {/* X axis label */}
                    <text
                        x={innerWidth / 2}
                        y={innerHeight + 45}
                        textAnchor="middle"
                        fontSize={12}
                        fill="#000"
                    >
                        {data.length > 0 ? 'Label' : ''}
                    </text>

                    {/* Y axis label */}
                    <text
                        transform={`translate(${-margin.left + 15}, ${
                            innerHeight / 2
                        }) rotate(-90)`}
                        textAnchor="middle"
                        fontSize={12}
                        fill="#000"
                    >
                        {data.length > 0 ? 'Value' : ''}
                    </text>
                </Group>
            </svg>

            {tooltipOpen && (
                <Tooltip
                    key={Math.random()}
                    top={tooltipTop}
                    left={tooltipLeft}
                >
                    Data value: <strong>{tooltipData}</strong>
                </Tooltip>
            )}
        </div>
    )
}
