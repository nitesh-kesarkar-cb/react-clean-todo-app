import { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

type ScatterGraphProps = {
    data: { date: number; value: number }[];
    title?: string;
    height: number;
    color?: string;
    tooltipColor?: string;
};

const marginTop = 30;
const marginRight = 30;
const marginBottom = 40;
const marginLeft = 50;

export default function ScatterGraph({
    data,
    height,
    title,
    color = '#007bff',
    tooltipColor = '#222',
}: ScatterGraphProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const svgRef = useRef<SVGSVGElement | null>(null);
    const [width, setWidth] = useState(400);

    useEffect(() => {
        function handleResize() {
            if (containerRef.current) {
                setWidth(containerRef.current.offsetWidth);
            }
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (!svgRef.current) return;
        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        const innerWidth = width - marginLeft - marginRight;
        const innerHeight = height - marginTop - marginBottom;

        const xScale = d3
            .scaleLinear()
            .domain(d3.extent(data, d => d.date) as [number, number])
            .range([0, innerWidth]);

        const yScale = d3
            .scaleLinear()
            .domain(d3.extent(data, d => d.value) as [number, number])
            .range([innerHeight, 0]);

        const chart = svg
            .append('g')
            .attr('transform', `translate(${marginLeft},${marginTop})`);

        chart
            .append('g')
            .attr('transform', `translate(0,${innerHeight})`)
            .call(d3.axisBottom(xScale));

        chart.append('g').call(d3.axisLeft(yScale));

        // Tooltip
        const tooltip = d3
            .select('body')
            .append('div')
            .style('position', 'absolute')
            .style('pointer-events', 'none')
            .style('background', tooltipColor)
            .style('color', '#fff')
            .style('padding', '6px 10px')
            .style('border-radius', '4px')
            .style('font-size', '12px')
            .style('visibility', 'hidden')
            .style('z-index', '10');

        chart
            .selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('cx', d => xScale(d.date))
            .attr('cy', d => yScale(d.value))
            .attr('r', 5)
            .attr('fill', color)
            .on('mouseover', function (_, d) {
                tooltip
                    .style('visibility', 'visible')
                    .html(`Date: ${d.date}<br/>Value: ${d.value}`);
                d3.select(this).attr('stroke', '#333').attr('stroke-width', 2);
            })
            .on('mousemove', function (event) {
                tooltip
                    .style('top', `${event.pageY - 40}px`)
                    .style('left', `${event.pageX + 10}px`);
            })
            .on('mouseout', function () {
                tooltip.style('visibility', 'hidden');
                d3.select(this).attr('stroke', 'none');
            });

        return () => {
            tooltip.remove();
        };
    }, [data, width, height, color, tooltipColor]);

    return (
        <div ref={containerRef} className="w-full">
            {title && <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>}
            <svg
                ref={svgRef}
                width={width}
                height={height}
                style={{ background: 'white' }}
            ></svg>
        </div>
    );
}
