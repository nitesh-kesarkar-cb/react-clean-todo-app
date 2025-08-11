import { useEffect, useState } from "react"
import Papa from "papaparse"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/shadcn/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/shadcn/components/ui/chart"

export type BarChartProps = {
  dataUrl: string
  height?: number
  margin?: { top?: number; right?: number; bottom?: number; left?: number }
  color?: string
  title?: string
}

const chartConfig = {
  Value: {
    label: "Value",
    color: "var(--chart-1)"
  }
} satisfies ChartConfig

export default function BarGraph({
  dataUrl,
  height = 300,
  margin = {},
  color = "var(--chart-1)",
  title
}: BarChartProps) {
  const [data, setData] = useState<{ Country: string; Value: number }[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetch(dataUrl)
      .then((res) => res.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            setData(results.data as { Country: string; Value: number }[])
            setError(null)
            setLoading(false)
          },
          error: (err: Error) => {
            setError(err.message)
            setLoading(false)
          }
        })
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [dataUrl])

  return (
    <Card>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : (
          <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
            <BarChart
              accessibilityLayer
              data={data}
              height={height}
              margin={{
                top: margin.top ?? 20,
                right: margin.right ?? 20,
                bottom: margin.bottom ?? 20,
                left: margin.left ?? 20
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Country" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="Value" fill={color} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
