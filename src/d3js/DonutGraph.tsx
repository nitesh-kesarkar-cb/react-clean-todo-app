import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface DonutGraphProps {
    width?: number;
    height?: number;
    marginTop?: number;
    marginRight?: number;
    marginBottom?: number;
    marginLeft?: number;
    title: string;
    innerSize?: string;
    data: {
        name: string;
        value: number;
    }[];
    color?: string;
    tooltipColor?: string;
}

export default function DonutGraph({
    title,
    innerSize = '60%',
    data,
    width = 640,
    height = 400,
    marginTop = 40,
    marginRight = 40,
    marginBottom = 60,
    marginLeft = 60,
    color = '',
    tooltipColor = ''
}: DonutGraphProps) {
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const currentWrapper = wrapperRef.current;
        if (!currentWrapper) return;

        d3.select(currentWrapper).selectAll('*').remove();

        // Calculate chart area
        const chartWidth = width - marginLeft - marginRight;
        const chartHeight = height - marginTop - marginBottom;
        const radius = Math.min(chartWidth, chartHeight) / 2 - 10;

        let ringWidth: number;
        if (innerSize.endsWith('%')) {
            const percent = parseFloat(innerSize) / 100;
            ringWidth = radius * percent;
        } else {
            ringWidth = parseFloat(innerSize);
        }

        const startAngle = - (3 * Math.PI) / 4;
        const endAngle = (3 * Math.PI) / 4;

        const pie = d3.pie<{ name: string; value: number }>()
            .value(d => d.value)
            .startAngle(startAngle)
            .endAngle(endAngle)
            .padAngle(0.02)
            .sort(null);

        const arcs = pie(data);

        const arcGen = d3.arc<d3.PieArcDatum<{ name: string; value: number }>>()
            .innerRadius(radius - ringWidth)
            .outerRadius(radius);

        const svg = d3.select(currentWrapper)
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .style('background', 'transparent');

        // Center group with margins
        const g = svg.append('g')
            .attr('transform', `translate(${marginLeft + chartWidth / 2},${marginTop + chartHeight / 2})`);

        // Color scale
        const colorScale = color
            ? d3.scaleOrdinal<string>().domain(data.map(d => d.name)).range(Array(data.length).fill(color))
            : d3.scaleOrdinal<string>().domain(data.map(d => d.name)).range(d3.schemeCategory10);

        // Tooltip
        let tooltip: d3.Selection<HTMLDivElement, unknown, null, undefined> | null = null;
        if (tooltipColor) {
            tooltip = d3.select(currentWrapper)
                .append('div')
                .style('position', 'absolute')
                .style('pointer-events', 'none')
                .style('background', tooltipColor)
                .style('color', '#fff')
                .style('padding', '6px 12px')
                .style('border-radius', '6px')
                .style('font-size', '1rem')
                .style('box-shadow', '0 2px 8px rgba(0,0,0,0.12)')
                .style('opacity', 0);
        }

        // Draw arcs with transitions
        g.selectAll('path')
            .data(arcs)
            .enter()
            .append('path')
            .attr('d', arcGen)
            .attr('fill', d => colorScale(d.data.name))
            .attr('stroke', '#fff')
            .attr('stroke-width', 2)
            .style('filter', 'drop-shadow(0 1px 2px rgba(0,0,0,0.08))')
            .on('mousemove', function (event, d) {
                if (tooltip) {
                    tooltip
                        .style('opacity', 1)
                        .style('left', (event.offsetX + 16) + 'px')
                        .style('top', (event.offsetY - 16) + 'px')
                        .html(`<strong>${d.data.name}</strong>: ${d.data.value}`);
                }
            })
            .on('mouseleave', function () {
                if (tooltip) {
                    tooltip.style('opacity', 0);
                }
            })
            .transition()
            .duration(700)
            .attrTween('d', function (d) {
                const i = d3.interpolate({ ...d, endAngle: d.startAngle }, d);
                return function (t) { return arcGen(i(t))!; };
            });

        // Center value text
        const total = data.reduce((sum, d) => sum + d.value, 0);
        g.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', '0.2em')
            .style('font-size', '1.8rem')
            .style('font-weight', 'bold')
            .style('fill', '#222')
            .text(total);

        // Title above donut
        if (title) {
            svg.append('text')
                .attr('x', marginLeft + chartWidth / 2)
                .attr('y', marginTop / 2)
                .attr('text-anchor', 'middle')
                .style('font-size', '1.35rem')
                .style('font-weight', 'bold')
                .style('fill', '#222')
                .style('letter-spacing', '0.5px')
                .style('text-shadow', '0 1px 4px rgba(0,0,0,0.07)')
                .text(title);
        }

        return () => {
            d3.select(currentWrapper).selectAll('*').remove();
        };
    }, [title, innerSize, data, width, height, marginTop, marginRight, marginBottom, marginLeft, color, tooltipColor]);

    return <div ref={wrapperRef} style={{ position: 'relative' }} />;
}
