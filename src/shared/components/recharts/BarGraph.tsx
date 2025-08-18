import { useEffect, useState } from 'react'
import Papa from 'papaparse'
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from '@/shadcn/components/ui/card'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
} from 'recharts'
import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/shadcn/components/ui/chart'

export type BarChartProps = {
    dataUrl: string
    height: number
    color?: string
    title?: string
    data?: { Country: string; Value: number }[]
}

const margin = { top: 40, right: 30, bottom: 60, left: 70 }

const chartConfig = {
    Value: {
        label: 'Value',
        color: 'var(--chart-1)',
    },
} satisfies ChartConfig

export default function BarGraph({
    dataUrl,
    color = 'var(--chart-1)',
    title,
    height,
    data = [],
}: BarChartProps) {
    const [barGraphData, setBarGraphData] = useState<
        { Country: string; Value: number }[]
    >([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        setLoading(true)
        if (data.length > 0) {
            setBarGraphData(data)
            setLoading(false)
        } else {
            if (dataUrl.length) {
                fetch(dataUrl)
                    .then((res) => res.text())
                    .then((csvText) => {
                        Papa.parse(csvText, {
                            header: true,
                            dynamicTyping: true,
                            skipEmptyLines: true,
                            complete: (results) => {
                                setBarGraphData(
                                    results.data as {
                                        Country: string
                                        Value: number
                                    }[]
                                )
                                setError(null)
                                setLoading(false)
                            },
                        })
                    })
                    .catch((err) => {
                        setError(err.message)
                        setLoading(false)
                    })
            }
        }
    }, [dataUrl])

    return (
        <Card className="w-full">
            {title && (
                <CardHeader className="text-lg font-semibold mb-4 text-center">
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
            )}
            <CardContent>
                {loading ? (
                    <div className="text-center py-8">Loading...</div>
                ) : error ? (
                    <div className="text-center text-red-500 py-8">{error}</div>
                ) : (
                    <ChartContainer
                        config={chartConfig}
                        className="w-full p-0"
                        style={{ height }}
                        data-testid="bar-chart-svg-recharts"
                    >
                        <div style={{ width: '100%', height }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={barGraphData} margin={margin}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="Country" />
                                    <YAxis />
                                    <ChartTooltip
                                        content={<ChartTooltipContent />}
                                    />
                                    <Bar
                                        dataKey="Value"
                                        fill={color}
                                        data-testid="bar-chart-svg-recharts-bar"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </ChartContainer>
                )}
            </CardContent>
        </Card>
    )
}
