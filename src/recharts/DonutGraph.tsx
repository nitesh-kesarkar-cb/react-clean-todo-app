import { Card, CardHeader, CardTitle, CardContent } from "@/shadcn/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, LabelList } from "recharts";
import clsx from "clsx";

interface DonutGraphProps {
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
    innerSize?: string;
    labelColor?: string; // <-- Add this prop
    data: {
        name: string;
        value: number;
    }[];
}

const DEFAULT_COLORS = [
    "#0088FE", "#00C49F", "#FFBB28", "#FF8042",
    "#A28EFF", "#FF6699", "#33CC99", "#FF6666", "#FFCC00", "#66CCCC"
];

export default function DonutGraph({
    title,
    innerSize = "60%",
    data,
    width = 640,
    height = 400,
    className,
    marginTop = 0,
    marginRight = 0,
    marginBottom = 0,
    marginLeft = 0,
    color,
    tooltipColor = "#fff",
    labelColor = "#222", // <-- Default label color
}: DonutGraphProps) {
    let innerRadius: number | string = 0;
    if (innerSize.endsWith("%")) {
        const percent = parseFloat(innerSize);
        innerRadius = `${percent}%`;
    } else {
        innerRadius = parseFloat(innerSize);
    }

    const total = data.reduce((sum, d) => sum + d.value, 0);

    const COLORS = color ? [color, ...DEFAULT_COLORS.slice(1)] : DEFAULT_COLORS;

    return (
        <Card className={clsx("w-fit p-0", className)} style={{ marginTop, marginRight, marginBottom, marginLeft }}>
            <CardHeader className="pb-2">
                {title && (
                    <CardTitle className="text-center text-lg font-bold">{title}</CardTitle>
                )}
            </CardHeader>
            <CardContent className="flex justify-center items-center p-0">
                <div style={{ position: "relative", width, height }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                startAngle={-225}
                                endAngle={45}
                                innerRadius={innerRadius}
                                outerRadius="100%"
                                paddingAngle={2}
                                stroke="#fff"
                                strokeWidth={2}
                                // label={({ name }) => name}
                                labelLine={false}
                            >
                                {data.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                                <LabelList
                                    dataKey="name"
                                    position="outside"
                                    color={labelColor}
                                />
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    background: tooltipColor,
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: 8,
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    <div
                        style={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            pointerEvents: "none",
                        }}
                    >
                        <span
                            style={{
                                fontSize: "1.8rem",
                                fontWeight: "bold",
                                color: "#222",
                            }}
                        >
                            {total}
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
