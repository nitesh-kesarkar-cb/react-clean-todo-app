import { useRef, useEffect, useState } from 'react'
import * as d3 from 'd3'

export interface HistogramGraphProps {
    data: {
        bins: { label: string; value: number }[]
    }
    height: number
    title?: string
}

const marginTop = 40
const marginRight = 30
const marginBottom = 40
const marginLeft = 50

export default function HistogramGraph({
    data,
    height,
    title,
}: HistogramGraphProps) {
    const ref = useRef<SVGSVGElement | null>(null)
    const containerRef = useRef<HTMLDivElement | null>(null)
    const [width, setWidth] = useState(600)

    // Measure container width
    useEffect(() => {
        const updateWidth = () => {
            if (ref.current?.parentElement) {
                setWidth(ref.current.parentElement.offsetWidth)
            }
        }
        updateWidth()
        const resizeObserver = new window.ResizeObserver(updateWidth)
        if (ref.current?.parentElement) {
            resizeObserver.observe(ref.current.parentElement)
        }
        return () => resizeObserver.disconnect()
    }, [])

    useEffect(() => {
        if (!ref.current) return

        // Clear previous svg
        d3.select(ref.current).selectAll('*').remove()

        const margin = {
            top: marginTop,
            right: marginRight,
            bottom: marginBottom,
            left: marginLeft,
        }
        const w = width - margin.left - margin.right
        const h = height - margin.top - margin.bottom

        const svg = d3
            .select(ref.current)
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`)

        const values = data.bins.map((bin) => bin.value)

        const x = d3
            .scaleLinear()
            .domain(d3.extent(values) as [number, number])
            .nice()
            .range([0, w])

        const binGenerator = d3
            .bin()
            .domain(x.domain() as [number, number])
            .thresholds(x.ticks(data.bins.length))

        const binsData = binGenerator(values)

        const y = d3
            .scaleLinear()
            .domain([0, d3.max(binsData, (d) => d.length) as number])
            .nice()
            .range([h, 0])

        svg.append('g')
            .attr('transform', `translate(0,${h})`)
            .call(d3.axisBottom(x))

        svg.append('g').call(d3.axisLeft(y))

        // Tooltip
        const tooltip = d3
            .select('body')
            .append('div')
            .style('position', 'absolute')
            .style('pointer-events', 'none')
            .style('background', '#fff')
            .style('padding', '6px 12px')
            .style('border-radius', '6px')
            .style('box-shadow', '0 2px 8px rgba(0,0,0,0.08)')
            .style('color', '#222')
            .style('font-size', '14px')
            .style('display', 'none')
            .style('z-index', '1000')

        svg.selectAll('rect')
            .data(binsData)
            .enter()
            .append('rect')
            .attr('x', (d) => x(d.x0 as number) + 1)
            .attr('y', (d) => y(d.length))
            .attr('width', (d) =>
                Math.max(0, x(d.x1 as number) - x(d.x0 as number) - 1)
            )
            .attr('height', (d) => h - y(d.length))
            .attr('fill', 'steelblue')
            .on('mousemove', function (event, d) {
                tooltip
                    .style('display', 'block')
                    .style('left', `${event.pageX + 10}px`)
                    .style('top', `${event.pageY - 28}px`)
                    .html(
                        `Range: ${d.x0?.toFixed(2)} - ${d.x1?.toFixed(2)}<br/>Count: ${d.length}`
                    )
            })
            .on('mouseout', () => {
                tooltip.style('display', 'none')
            })

        return () => {
            tooltip.remove()
        }
    }, [data, height, width])

    return (
        <div ref={containerRef} className="w-full">
            {title && (
                <h3 className="text-lg font-semibold mb-4 text-center">
                    {title}
                </h3>
            )}
            <svg
                ref={ref}
                width={width}
                height={height}
                style={{ background: 'white' }}
                data-testid="histogram-graph-svg-d3"
            />
        </div>
    )
}
