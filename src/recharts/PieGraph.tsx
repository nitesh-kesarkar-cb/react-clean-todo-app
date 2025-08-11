import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/shadcn/components/ui/card';

export interface PieGraphProps {
    data: {
        label: string;
        value: number;
    }[];
    width?: number;
    height?: number;
    innerRadius?: number;
    title?: string;
}

const COLORS = [
    '#8884d8', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658', '#ff8042', '#ffbb28',
];

export default function PieGraph({
    data,
    width = 640,
    height = 400,
    innerRadius = 0,
    title,
}: PieGraphProps) {
    return (
        <Card className="w-full max-w-xl mx-auto">
            {title && (
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
            )}
            <CardContent>
                <ResponsiveContainer width="100%" height={height}>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="label"
                            cx="50%"
                            cy="50%"
                            innerRadius={innerRadius}
                            outerRadius={Math.min(width, height) / 2 - 40}
                            paddingAngle={2}
                            label={({ label }) => label}
                        >
                            {data.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}