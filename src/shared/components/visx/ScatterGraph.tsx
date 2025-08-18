'use client'

import { useMemo, useState, useRef, useEffect } from 'react'
import { Group } from '@visx/group'
import { Circle } from '@visx/shape'
import { scaleLinear } from '@visx/scale'
import { useTooltip, Tooltip } from '@visx/tooltip'
import { localPoint } from '@visx/event'
import { AxisBottom, AxisLeft } from '@visx/axis'

type ScatterGraphProps = {
    data: { date: number; value: number }[]
    title?: string
    height: number
}

const pointColor = '#3b82f6'

export default function ScatterGraph({
    data,
    title,
    height,
}: ScatterGraphProps) {
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

    // Responsive resize
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

    // Margins
    const margin = { top: 20, right: 20, bottom: 50, left: 60 }
    const innerWidth = Math.max(0, width - margin.left - margin.right)
    const innerHeight = Math.max(0, height - margin.top - margin.bottom)

    // Scales
    const xMax = data.length > 0 ? Math.max(...data.map((d) => d.date)) : 1
    const yMax = data.length > 0 ? Math.max(...data.map((d) => d.value)) : 1

    const xScale = useMemo(
        () =>
            scaleLinear<number>({
                domain: [0, xMax * 1.1],
                range: [0, innerWidth],
                nice: true,
            }),
        [innerWidth, xMax]
    )

    const yScale = useMemo(
        () =>
            scaleLinear<number>({
                domain: [0, yMax * 1.1],
                range: [innerHeight, 0],
                nice: true,
            }),
        [innerHeight, yMax]
    )

    return (
        <div
            ref={containerRef}
            className="w-full"
            data-testid="scatter-graph-svg-visx"
        >
            {title && (
                <div className="text-lg font-semibold mb-2 text-gray-800 text-center">
                    {title}
                </div>
            )}
            <svg
                width={width}
                height={height}
                style={{ background: 'white' }}
                data-testid="scatter-graph-svg-visx"
            >
                <Group left={margin.left} top={margin.top}>
                    {/* Axes */}
                    <line
                        x1={0}
                        y1={innerHeight}
                        x2={innerWidth}
                        y2={innerHeight}
                        stroke="#333"
                    />
                    <line x1={0} y1={0} x2={0} y2={innerHeight} stroke="#333" />

                    {/* Points */}
                    {data.map((d, i) => (
                        <Circle
                            key={`point-${i}`}
                            cx={xScale(d.date)}
                            cy={yScale(d.value)}
                            r={4}
                            fill={pointColor}
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
                    ))}
                    <AxisLeft
                        scale={yScale}
                        label={'Value'}
                        stroke="#333"
                        tickStroke="#333"
                        tickLabelProps={() => ({
                            fill: '#333',
                            fontSize: 12,
                            textAnchor: 'end',
                            dy: '0.33em',
                        })}
                        labelProps={{
                            fontSize: 14,
                            fill: '#333',
                            textAnchor: 'middle',
                            fontWeight: 'bold',
                        }}
                    />

                    <AxisBottom
                        scale={xScale}
                        top={innerHeight}
                        label={'Date'}
                        stroke="#333"
                        tickStroke="#333"
                        tickLabelProps={() => ({
                            fill: '#333',
                            fontSize: 12,
                            textAnchor: 'middle',
                        })}
                        labelProps={{
                            fontSize: 14,
                            fill: '#333',
                            textAnchor: 'middle',
                            fontWeight: 'bold',
                        }}
                    />
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
