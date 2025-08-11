import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export interface PieGraphProps {
    data: {
        label: string;
        value: number;
    }[];
    width?: number;
    height?: number;
    marginTop?: number;
    marginRight?: number;
    marginBottom?: number;
    marginLeft?: number;
    innerRadius?: number;
    title?: string;
    color?: string; 
    tooltipColor?: string;
}

export default function PieGraph({
    data,
    width = 640,
    height = 400,
    marginTop = 40,
    marginRight = 40,
    marginBottom = 60,
    marginLeft = 60,
    innerRadius = 0,
    title,
    color = '',
    tooltipColor = '',
}: PieGraphProps) {
    const ref = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (!ref.current) return;

        d3.select(ref.current).selectAll('*').remove();

        const radius = Math.min(
            width - marginLeft - marginRight,
            height - marginTop - marginBottom
        ) / 2;

        const svg = d3
            .select(ref.current)
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr(
                'transform',
                `translate(${marginLeft + (width - marginLeft - marginRight) / 2}, ${marginTop + (height - marginTop - marginBottom) / 2})`
            );

        // Add title if provided
        if (title) {
            svg
                .append('text')
                .attr('x', 0)
                .attr('y', -radius - 20)
                .attr('text-anchor', 'middle')
                .style('font-size', '18px')
                .style('font-weight', 'bold')
                .text(title);
        }

        // Color scale
        let colorScale: d3.ScaleOrdinal<string, string>;
        if (color) {
            const palette = color.includes(',')
                ? color.split(',').map((c) => c.trim())
                : d3.schemeSet2;
            colorScale = d3
                .scaleOrdinal<string>()
                .domain(data.map((d) => d.label))
                .range(palette);
        } else {
            colorScale = d3
                .scaleOrdinal<string>()
                .domain(data.map((d) => d.label))
                .range(d3.schemeSet2);
        }

        const pie = d3.pie<{ label: string; value: number }>().value((d) => d.value);
        const data_ready = pie(data);

        const arc = d3.arc<d3.PieArcDatum<{ label: string; value: number }>>()
            .innerRadius(innerRadius)
            .outerRadius(radius);

        // Tooltip
        const tooltip = d3
            .select(ref.current.parentElement)
            .append('div')
            .style('position', 'absolute')
            .style('visibility', 'hidden')
            .style('background', tooltipColor || 'rgba(0,0,0,0.7)')
            .style('color', '#fff')
            .style('padding', '6px 12px')
            .style('border-radius', '4px')
            .style('font-size', '13px')
            .style('pointer-events', 'none');

        svg
            .selectAll('path')
            .data(data_ready)
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', (d) => colorScale(d.data.label))
            .attr('stroke', 'white')
            .style('stroke-width', '2px')
            .style('opacity', 0.7)
            .on('mouseover', function (_, d) {
                tooltip
                    .style('visibility', 'visible')
                    .text(`${d.data.label}: ${d.data.value}`);
                d3.select(this).style('opacity', 1);
            })
            .on('mousemove', function (event) {
                tooltip
                    .style('top', `${event.pageY - 40}px`)
                    .style('left', `${event.pageX + 10}px`);
            })
            .on('mouseout', function () {
                tooltip.style('visibility', 'hidden');
                d3.select(this).style('opacity', 0.7);
            });

        svg
            .selectAll('text.label')
            .data(data_ready)
            .enter()
            .append('text')
            .attr('class', 'label')
            .text((d) => d.data.label)
            .attr('transform', (d) => `translate(${arc.centroid(d)})`)
            .style('text-anchor', 'middle')
            .style('font-size', '12px');

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
        innerRadius,
        title,
        color,
        tooltipColor,
    ]);

    return <svg ref={ref} style={{ display: 'block' }} />;
}
