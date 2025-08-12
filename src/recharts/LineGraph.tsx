import {
    CartesianGrid,
    Line,
    LineChart,
    XAxis,
    YAxis,
    Label,
} from "recharts"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/shadcn/components/ui/card"

import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from "@/shadcn/components/ui/chart"

type LineGraphProps = {
    data: number[]
    title?: string
    xLabel?: string
    yLabel?: string
    height: number
}

const chartConfig = (yLabel: string) => ({

    [yLabel]: {
        label: yLabel,
        color: "var(--chart-1)",
    },
}) satisfies ChartConfig

export default function LineGraph({
    data,
    title = "Line Graph",
    xLabel = "X Axis",
    yLabel = "Y Axis",
    height
}: LineGraphProps) {
    const chartData = data.map((value, index) => ({
        [xLabel]: index + 1,
        [yLabel]: value,
    }))

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig(yLabel)} style={{ width: "100%", height }}>
                    <LineChart
                        accessibilityLayer
                        height={height}
                        data={chartData}
                        margin={{ left: 12, right: 12, bottom: 40 }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey={xLabel}
                            tickLine={true}
                            axisLine={true}
                            tickMargin={8}
                            label={
                                <Label
                                    value={xLabel}
                                    offset={-10}
                                    position="insideBottom"
                                />
                            }
                        />
                        <YAxis
                            label={
                                <Label
                                    value={yLabel}
                                    angle={-90}
                                    position="insideLeft"
                                />
                            }
                        />
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Line
                            dataKey={yLabel}
                            type="natural"
                            stroke="var(--chart-1)"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
