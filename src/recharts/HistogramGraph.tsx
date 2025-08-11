import { Card, CardHeader, CardTitle, CardContent } from "@/shadcn/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

interface HistogramGraphProps {
    width?: number;
    height?: number;
    title: string;
    data: {
        label: string;
        value: number;
    }[];
}

export default function HistogramGraph({
    title,
    data,
    width = 640,
    height = 400,
}: HistogramGraphProps) {
    return (
        <Card className="w-full max-w-xl mx-auto">
            <CardHeader>
                <CardTitle className="text-lg font-bold">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width={width} height={height}>
                    <BarChart data={data} margin={{ top: 16, right: 24, left: 0, bottom: 24 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="label" tick={{ fontSize: 14 }} />
                        <YAxis tick={{ fontSize: 14 }} />
                        <Tooltip
                            wrapperClassName="!rounded-lg !shadow-lg !bg-white"
                            contentStyle={{ fontSize: "1rem" }}
                        />
                        <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}