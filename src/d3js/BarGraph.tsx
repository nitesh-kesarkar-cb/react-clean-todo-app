import * as d3 from "d3";
import { useEffect, useRef } from "react";

type BarChartProps = {
  dataUrl: string;
  width?: number;
  height?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  color?: string;
  tooltipColor?: string;
  title?: string;
};

export default function BarGraph({
  dataUrl,
  width = 640,
  height = 400,
  marginTop = 40,
  marginRight = 40,
  marginBottom = 60,
  marginLeft = 60,
  color = "#5f0f40",
  tooltipColor = "#374151",
  title,
}: BarChartProps) {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const chartWidth = width - marginLeft - marginRight;
    const chartHeight = height - marginTop - marginBottom;

    d3.select(ref.current).selectAll("*").remove();

    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${marginLeft},${marginTop})`);

    d3.csv(dataUrl).then(function (data) {
      const x = d3
        .scaleBand()
        .range([0, chartWidth])
        .domain(data.map((d) => d.Country))
        .padding(0.2);

      svg
        .append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end")
        .style("font-size", "0.75rem")
        .style("fill", tooltipColor);

      const y = d3.scaleLinear().domain([0, 13000]).range([chartHeight, 0]);
      svg.append("g")
        .call(d3.axisLeft(y))
        .selectAll("text")
        .style("font-size", "0.75rem")
        .style("fill", tooltipColor);

      svg
        .selectAll("mybar")
        .data(data)
        .join("rect")
        .attr("x", (d) => x(d.Country) ?? 0)
        .attr("y", (d) => y(+d.Value))
        .attr("width", x.bandwidth())
        .attr("height", (d) => chartHeight - y(+d.Value))
        .attr("fill", color)
        .attr("rx", 4);
    });
  }, [dataUrl, width, height, marginTop, marginRight, marginBottom, marginLeft, color, tooltipColor]);

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      {title && (
        <h3 className="text-lg font-semibold mb-4 text-center w-full">{title}</h3>
      )}
      <svg
        ref={ref}
        id="barchart"
        className="w-full h-full max-w-[460px] max-h-[400px] bg-gray-50 rounded-lg"
      />
    </div>
  );
}
