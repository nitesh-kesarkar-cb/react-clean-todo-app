import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from '@/shadcn/components/ui/card'
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    LabelList,
} from 'recharts'

interface DonutGraphProps {
    title?: string
    height: number
    data: {
        name: string
        value: number
    }[]
    color?: string
}

const DEFAULT_COLORS = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#A28EFF',
    '#FF6699',
    '#33CC99',
    '#FF6666',
    '#FFCC00',
    '#66CCCC',
]

export default function DonutGraph({
    title,
    data,
    height,
    color,
}: DonutGraphProps) {
    const innerRadius: number | string = '50%'
    const total = data.reduce((sum, d) => sum + d.value, 0)
    const COLORS = color ? [color, ...DEFAULT_COLORS] : DEFAULT_COLORS

    return (
        <Card className="w-full p-0" style={{ margin: 0 }}>
            <CardHeader className="pb-2">
                {title && (
                    <CardTitle className="text-center text-lg font-bold">
                        {title}
                    </CardTitle>
                )}
            </CardHeader>
            <CardContent className="flex justify-center items-center p-0 w-full">
                <div style={{ width: '100%', height, position: 'relative' }}>
                    <ResponsiveContainer width="100%" height={height}>
                        <PieChart data-testid="donut-graph-svg-recharts">
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
                                labelLine={false}
                            >
                                {data.map((_, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                                <LabelList
                                    dataKey="name"
                                    position="outside"
                                    color={'#222'}
                                />
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    background: '#fff',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: 8,
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    <div
                        style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            pointerEvents: 'none',
                        }}
                    >
                        <span
                            style={{
                                fontSize: '1.8rem',
                                fontWeight: 'bold',
                                color: '#222',
                            }}
                        >
                            {total}
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
