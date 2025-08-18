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
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts'

interface HistogramGraphProps {
    title: string
    data: {
        label: string
        value: number
    }[]
    height: number
}

export default function HistogramGraph({
    title,
    data,
    height,
}: HistogramGraphProps) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-lg font-bold">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={height}>
                    <BarChart
                        data={data}
                        margin={{ top: 16, right: 24, left: 0, bottom: 24 }}
                        barCategoryGap={0}
                        barGap={0}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="label" tick={{ fontSize: 14 }} />
                        <YAxis tick={{ fontSize: 14 }} />
                        <Tooltip
                            wrapperClassName="!rounded-lg !shadow-lg !bg-white"
                            contentStyle={{ fontSize: '1rem' }}
                        />
                        <Bar
                            dataKey="value"
                            fill="#6366f1"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
