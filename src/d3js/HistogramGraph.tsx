import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

export interface HistogramGraphProps {
    data: {
        bins: { label: string; value: number }[];
    };
    width?: number;
    height?: number;
    title?: string;
    className?: string;
    marginTop?: number;
    marginRight?: number;
    marginBottom?: number;
    marginLeft?: number;
    color?: string;
    tooltipColor?: string;
}

export default function HistogramGraph({
    data,
    width = 640,
    height = 400,
    title,
    className = '',
    marginTop = 40,
    marginRight = 40,
    marginBottom = 60,
    marginLeft = 60,
    color = '#14b8a6', // default teal-400
    tooltipColor = '#f9fafb', // default gray-50
}: HistogramGraphProps) {
    const ref = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        const margin = { top: marginTop, right: marginRight, bottom: marginBottom, left: marginLeft };
        const w = width - margin.left - margin.right;
        const h = height - margin.top - margin.bottom;

        d3.select(ref.current).selectAll('*').remove();

        const svg = d3
            .select(ref.current)
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Extract numeric values from data.bins
        const values = data.bins.map(bin => bin.value);

        // Compute x domain from values
        const x = d3.scaleLinear()
            .domain(d3.extent(values) as [number, number])
            .nice()
            .range([0, w]);

        // Use d3.bin instead of deprecated d3.histogram
        const binGenerator = d3.bin()
            .domain(x.domain() as [number, number])
            .thresholds(x.ticks(data.bins.length));

        const binsData = binGenerator(values);

        const y = d3.scaleLinear()
            .domain([0, d3.max(binsData, d => d.length) as number])
            .nice()
            .range([h, 0]);

        svg.append('g')
            .attr('transform', `translate(0,${h})`)
            .call(d3.axisBottom(x));

        svg.append('g')
            .call(d3.axisLeft(y));

        // Tooltip
        const tooltip = d3.select('body')
            .append('div')
            .style('position', 'absolute')
            .style('pointer-events', 'none')
            .style('background', tooltipColor)
            .style('padding', '6px 12px')
            .style('border-radius', '6px')
            .style('box-shadow', '0 2px 8px rgba(0,0,0,0.08)')
            .style('color', '#222')
            .style('font-size', '14px')
            .style('display', 'none')
            .style('z-index', '1000');

        svg.selectAll('rect')
            .data(binsData)
            .enter()
            .append('rect')
            .attr('x', d => x(d.x0 as number) + 1)
            .attr('y', d => y(d.length))
            .attr('width', d => Math.max(0, x(d.x1 as number) - x(d.x0 as number) - 1))
            .attr('height', d => h - y(d.length))
            .attr('fill', color)
            .on('mousemove', function (event, d) {
                tooltip
                    .style('display', 'block')
                    .style('left', `${event.pageX + 10}px`)
                    .style('top', `${event.pageY - 28}px`)
                    .html(
                        `Range: ${d.x0?.toFixed(2)} - ${d.x1?.toFixed(2)}<br/>Count: ${d.length}`
                    );
            })
            .on('mouseout', () => {
                tooltip.style('display', 'none');
            });

        return () => {
            tooltip.remove();
        };
    }, [data, width, height, marginTop, marginRight, marginBottom, marginLeft, color, tooltipColor]);

    return (
        <div className={`flex flex-col items-center bg-white rounded-lg shadow p-4 ${className}`}>
            {title && (
                <h2 className="text-lg font-semibold mb-2 text-gray-700">{title}</h2>
            )}
            <svg ref={ref} className="w-full h-auto" />
        </div>
    );
}
