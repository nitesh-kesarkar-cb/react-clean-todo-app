import * as d3 from 'd3'
import { useRef, useEffect, useState } from 'react'

export type BarChartProps = {
    dataUrl: string
    title?: string
    height: number
    xLabel?: string
    yLabel?: string
    data?: { country: string; value: number }[]
}

const margin = { top: 40, right: 30, bottom: 60, left: 70 }

export default function BarChart({
    dataUrl,
    data,
    title,
    height,
    xLabel = 'Country',
    yLabel = 'Value',
}: BarChartProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const svgRef = useRef<SVGSVGElement>(null)
    const [width, setWidth] = useState(0)

    // Responsive width via ResizeObserver
    useEffect(() => {
        if (!containerRef.current) return
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setWidth(entry.contentRect.width)
            }
        })
        observer.observe(containerRef.current)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (!width || !svgRef.current) return

        const chartWidth = width - margin.left - margin.right
        const chartHeight = height - margin.top - margin.bottom

        const svg = d3.select(svgRef.current)
        svg.selectAll('*').remove()

        const g = svg
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`)

        const renderChart = (
            chartData: { country: string; value: number }[]
        ) => {
            const x = d3
                .scaleBand<string>()
                .domain(chartData.map((d) => d.country))
                .range([0, chartWidth])
                .padding(0.2)

            const y = d3
                .scaleLinear()
                .domain([0, d3.max(chartData, (d) => d.value)! * 1.1])
                .nice()
                .range([chartHeight, 0])

            // X Axis
            g.append('g')
                .attr('transform', `translate(0,${chartHeight})`)
                .call(d3.axisBottom(x))
                .selectAll('text')
                .attr('transform', 'rotate(-45)')
                .attr('text-anchor', 'end')
                .attr('class', 'text-xs text-gray-600')

            g.append('text')
                .attr('x', chartWidth / 2)
                .attr('y', chartHeight + 45)
                .attr('text-anchor', 'middle')
                .attr('class', 'text-sm text-gray-700')
                .text(xLabel)

            // Y Axis
            g.append('g')
                .call(d3.axisLeft(y))
                .selectAll('text')
                .attr('class', 'text-xs text-gray-600')

            g.append('text')
                .attr('transform', `rotate(-90)`)
                .attr('x', -chartHeight / 2)
                .attr('y', -50)
                .attr('text-anchor', 'middle')
                .attr('class', 'text-sm text-gray-700')
                .text(yLabel)

            // Bars
            g.selectAll('rect')
                .data(chartData)
                .join('rect')
                .attr('x', (d) => x(d.country)!)
                .attr('y', (d) => y(d.value))
                .attr('width', x.bandwidth())
                .attr('height', (d) => chartHeight - y(d.value))
                .attr('fill', '#3b82f6') // Tailwind blue-500
                .attr('rx', 4)
                .on('mouseover', function () {
                    d3.select(this).attr('fill', '#2563eb') // Tailwind blue-600
                })
                .on('mouseout', function () {
                    d3.select(this).attr('fill', '#3b82f6')
                })
        }

        if (data && data.length > 0) {
            renderChart(data)
        } else {
            d3.csv(dataUrl).then((raw) => {
                const csvData = raw.map((d) => ({
                    country: (d.Country ?? d.country) as string,
                    value: +(d.Value ?? d.value)!,
                }))
                renderChart(csvData)
            })
        }
    }, [width, data, dataUrl, height, xLabel, yLabel])

    return (
        <div ref={containerRef} className="w-full">
            {title && (
                <h3 className="text-lg font-semibold mb-4 text-center">
                    {title}
                </h3>
            )}
            <svg
                ref={svgRef}
                width={width}
                height={height}
                style={{ background: 'white' }}
                data-testid="bar-chart-svg-d3"
            />
        </div>
    )
}
