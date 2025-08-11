import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

type ScatterGraphProps = {
    data: { date: number; value: number }[];
    title?: string;
    width?: number;
    height?: number;
    marginTop?: number;
    marginRight?: number;
    marginBottom?: number;
    marginLeft?: number;
    color?: string;
    tooltipColor?: string;
};

export default function ScatterGraph({
    data,
    width = 640,
    height = 400,
    marginTop = 40,
    marginRight = 40,
    marginBottom = 60,
    marginLeft = 60,
    color = 'steelblue',
    tooltipColor = 'rgba(0,0,0,0.8)',
    title,
}: ScatterGraphProps) {
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
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
    }, [
        data,
        width,
        height,
        marginTop,
        marginRight,
        marginBottom,
        marginLeft,
        color,
        tooltipColor,
    ]);

    return (
        <div className="flex flex-col items-center bg-white p-4 rounded shadow" style={{ position: 'relative' }}>
            {title && (
                <h2 className="text-xl font-semibold mb-2 text-gray-800">{title}</h2>
            )}
            <svg
                ref={svgRef}
                width={width}
                height={height}
                className="bg-gray-50 rounded"
            ></svg>
        </div>
    );
}
