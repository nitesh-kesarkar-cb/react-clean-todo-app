import * as d3 from 'd3'
import { useEffect, useRef, useState } from 'react'

export interface PieGraphProps {
    data: { label: string; value: number }[]
    title?: string
    innerRadius?: number
    height: number
}

export default function PieGraph({
    data,
    title,
    innerRadius = 0,
    height,
}: PieGraphProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const svgRef = useRef<SVGSVGElement>(null)
    const [width, setWidth] = useState(0)

    useEffect(() => {
        if (!containerRef.current) return
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) setWidth(entry.contentRect.width)
        })
        observer.observe(containerRef.current)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (!width || !svgRef.current) return

        const margin = { top: 40, right: 40, bottom: 60, left: 60 }
        const radius =
            Math.min(
                width - margin.left - margin.right,
                height - margin.top - margin.bottom
            ) / 2

        const svg = d3.select(svgRef.current)
        svg.selectAll('*').remove()

        const g = svg
            .append('g')
            .attr(
                'transform',
                `translate(${margin.left + (width - margin.left - margin.right) / 2}, ${margin.top + (height - margin.top - margin.bottom) / 2})`
            )

        const palette = d3.schemeSet2
        const colorScale = d3
            .scaleOrdinal<string>()
            .domain(data.map((d) => d.label))
            .range(palette)

        const pieGenerator = d3
            .pie<{ label: string; value: number }>()
            .value((d) => d.value)
        const arcs = pieGenerator(data)

        const arcGenerator = d3
            .arc<d3.PieArcDatum<{ label: string; value: number }>>()
            .innerRadius(innerRadius)
            .outerRadius(radius)

        const tooltip = d3
            .select(containerRef.current)
            .append('div')
            .attr(
                'class',
                'absolute hidden bg-gray-800 text-white text-xs rounded px-2 py-1 pointer-events-none'
            )
            .style('background', 'rgba(0,0,0,0.7)')

        g.selectAll('path')
            .data(arcs)
            .enter()
            .append('path')
            .attr('d', arcGenerator)
            .attr('fill', (d) => colorScale(d.data.label))
            .attr('stroke', 'white')
            .attr('stroke-width', 2)
            .attr('opacity', 0.8)
            .on('mouseover', function (_, d) {
                tooltip
                    .style('display', 'block')
                    .text(`${d.data.label}: ${d.data.value}`)
                d3.select(this).attr('opacity', 1)
            })
            .on('mousemove', function (event) {
                tooltip
                    .style(
                        'top',
                        `${event.pageY - containerRef.current!.getBoundingClientRect().top + 10}px`
                    )
                    .style(
                        'left',
                        `${event.pageX - containerRef.current!.getBoundingClientRect().left + 10}px`
                    )
            })
            .on('mouseout', function () {
                tooltip.style('display', 'none')
                d3.select(this).attr('opacity', 0.8)
            })

        g.selectAll('text.slice-label')
            .data(arcs)
            .enter()
            .append('text')
            .attr('class', 'slice-label text-xs fill-gray-700')
            .attr('transform', (d) => `translate(${arcGenerator.centroid(d)})`)
            .attr('text-anchor', 'middle')
            .text((d) => d.data.label)

        return () => {
            tooltip.remove()
        }
    }, [width, data, title, innerRadius, height])

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
                data-testid="pie-graph-svg-d3"
            />
        </div>
    )
}
