import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from "@/shadcn/components/ui/card";

type ScatterGraphProps = {
    data: { date: number; value: number }[];
    title?: string;
    height: number;
};

export default function ScatterGraph({
    data,
    title,
    height
}: ScatterGraphProps) {
    return (
        <Card className="w-full">
            {title && (
                <CardHeader>
                    <CardTitle className="text-xl font-semibold mb-2 text-gray-800">{title}</CardTitle>
                </CardHeader>
            )}
            <CardContent className="w-full flex justify-center">
                <ResponsiveContainer width="100%" height={height}>
                    <ScatterChart
                        margin={{ top: 40, right: 30, bottom: 40, left: 50 }}
                    >
                        <CartesianGrid />
                        <XAxis
                            type="number"
                            dataKey="date"
                            name="Date"
                            tick={{ fontSize: 12 }}
                            label={{ value: "Date", position: "insideBottom", offset: -10 }}
                        />
                        <YAxis
                            type="number"
                            dataKey="value"
                            name="Value"
                            tick={{ fontSize: 12 }}
                            label={{ value: "Value", angle: -90, position: "insideLeft", offset: 10 }}
                        />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Scatter name="Data" data={data} fill="#2563eb" />
                    </ScatterChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}