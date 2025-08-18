import { useEffect, useRef, useState } from 'react'
import { Group } from '@visx/group'
import { Bar } from '@visx/shape'
import { scaleLinear, scaleBand } from '@visx/scale'
import Papa from 'papaparse'
import { AxisBottom, AxisLeft } from '@visx/axis'

export type BarGraphProps = {
    dataUrl?: string
    height: number
    color?: string
    title?: string
    data?: { Country: string; Value: number }[]
}

export default function BarGraph({
    dataUrl,
    color = '#fc2e1c',
    title,
    height,
    data = [],
}: BarGraphProps) {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const [width, setWidth] = useState(0)
    const [barGraphData, setBarGraphData] = useState<
        { Country: string; Value: number }[]
    >([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // increased left/bottom for axis labels & ticks
    const margin = { top: 20, right: 20, bottom: 60, left: 70 }

    // ResizeObserver to keep svg responsive
    useEffect(() => {
        if (!containerRef.current) return
        // set initial width if available
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

    // Load CSV or use provided data
    useEffect(() => {
        setLoading(true)
        setError(null)

        if (data && data.length > 0) {
            setBarGraphData(data)
            setLoading(false)
            return
        }

        if (dataUrl && dataUrl.length) {
            fetch(dataUrl)
                .then((r) => r.text())
                .then((csvText) => {
                    Papa.parse(csvText, {
                        header: true,
                        dynamicTyping: true,
                        skipEmptyLines: true,
                        complete: (results) => {
                            setBarGraphData(
                                (results.data as {
                                    Country: string
                                    Value: number
                                }[]) || []
                            )
                            setLoading(false)
                        },
                    })
                })
                .catch((err) => {
                    setError(err.message)
                    setLoading(false)
                })
        } else {
            setBarGraphData([])
            setLoading(false)
        }
    }, [dataUrl])

    // inner drawing bounds
    const innerWidth = Math.max(0, width - margin.left - margin.right)
    const innerHeight = Math.max(0, height - margin.top - margin.bottom)

    // accessors
    const x = (d: { Country: string; Value: number }) => String(d.Country)
    const y = (d: { Country: string; Value: number }) => Number(d.Value)

    // scales (guard against empty domain)
    const xDomain = barGraphData.length > 0 ? barGraphData.map(x) : []
    const maxVal =
        barGraphData.length > 0 ? Math.max(...barGraphData.map(y), 0) : 1

    const xScale = scaleBand<string>({
        domain: xDomain,
        range: [0, innerWidth],
        padding: 0.2,
        round: true,
    })

    const yScale = scaleLinear<number>({
        domain: [0, Math.max(1, maxVal * 1.1)], // headroom so bars don't touch top
        range: [innerHeight, 0],
        round: true,
    })

    return (
        <div ref={containerRef} className="w-full">
            {title && <div className="mb-2 font-bold text-center">{title}</div>}
            {loading && <div>Loading...</div>}
            {error && <div className="text-red-500">Error: {error}</div>}

            {!loading && !error && (
                <svg
                    width={Math.max(width, 0)}
                    height={height}
                    data-testid="bar-chart-svg-visx"
                    style={{ background: 'white' }}
                >
                    {/* Shift origin by margins */}
                    <Group left={margin.left} top={margin.top}>
                        {/* Bars */}
                        {barGraphData.map((d, i) => {
                            const xPos = xScale(x(d)) ?? 0
                            const bw = xScale.bandwidth ? xScale.bandwidth() : 0
                            const barY = yScale(y(d))
                            const barHeight = innerHeight - barY
                            return (
                                <Group key={`bar-${i}`}>
                                    <Bar
                                        x={xPos}
                                        y={barY}
                                        width={bw}
                                        height={barHeight}
                                        rx={3}
                                        ry={3}
                                        fill={color}
                                        data-testid={`bar-${i}`}
                                    />
                                </Group>
                            )
                        })}

                        {/* X axis at bottom of plotting area */}
                        <AxisBottom
                            top={innerHeight}
                            scale={xScale}
                            stroke="#333"
                            tickStroke="#333"
                            hideAxisLine={false}
                            hideTicks={false}
                            tickLabelProps={() => ({
                                fontSize: 11,
                                textAnchor: 'middle',
                            })}
                            tickFormat={(d) => String(d)}
                        />

                        {/* Y axis at left */}
                        <AxisLeft
                            scale={yScale}
                            stroke="#333"
                            tickStroke="#333"
                            hideAxisLine={false}
                            hideTicks={false}
                            tickLabelProps={() => ({
                                fontSize: 11,
                                dx: '-0.5em',
                                textAnchor: 'end',
                            })}
                        />

                        {/* X axis label (centered under axis) */}
                        <text
                            x={innerWidth / 2}
                            y={innerHeight + 40}
                            textAnchor="middle"
                            fontSize={12}
                            fill="#000"
                        >
                            {barGraphData.length > 0 ? 'Country' : ''}
                        </text>

                        {/* Y axis label (rotated) */}
                        <text
                            transform={`translate(${-margin.left + -20}, ${innerHeight / 2}) rotate(-90)`}
                            textAnchor="middle"
                            fontSize={12}
                            fill="#000"
                        >
                            {barGraphData.length > 0 ? 'Value' : ''}
                        </text>
                    </Group>
                </svg>
            )}
        </div>
    )
}
