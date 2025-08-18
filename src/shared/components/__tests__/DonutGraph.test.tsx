import { render, screen, act, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import DonutGraphD3Js from '../d3js/DonutGraph'
import DonutGraphRecharts from '../recharts/DonutGraph'

class ResizeObserverMock implements ResizeObserver {
    callback: ResizeObserverCallback
    constructor(callback: ResizeObserverCallback) {
        this.callback = callback
    }
    async observe(): Promise<void> {
        await act(async () => {
            this.callback(
                [
                    {
                        contentRect: {
                            width: 400,
                            height: 0,
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                        },
                    } as ResizeObserverEntry,
                ],
                this
            )
        })
    }
    unobserve(): void {}
    disconnect(): void {}
}
;(
    global as unknown as { ResizeObserver: typeof ResizeObserver }
).ResizeObserver = ResizeObserverMock

describe('DonutGraphD3Js', () => {
    const sampleData = [
        { name: 'A', value: 10 },
        { name: 'B', value: 20 },
        { name: 'C', value: 30 },
    ]

    it('renders the title', () => {
        render(
            <DonutGraphD3Js title="My Donut" data={sampleData} height={300} />
        )
        expect(screen.getByText('My Donut')).toBeInTheDocument()
    })

    it('renders svg when `data` prop is provided', () => {
        render(
            <DonutGraphD3Js title="My Donut" data={sampleData} height={300} />
        )
        const svg = screen.getByTestId('donut-graph-svg-d3')
        expect(svg).toBeInTheDocument()
    })

    it('renders one arc path per data item', async () => {
        render(<DonutGraphD3Js title="Arcs" data={sampleData} height={300} />)
        const svg = screen.getByTestId('donut-graph-svg-d3')
        await waitFor(() => {
            const arcs = svg.querySelectorAll('path')
            expect(arcs.length).toBe(sampleData.length)
        })
    })

    it('displays the total value in the center', () => {
        render(<DonutGraphD3Js title="Total" data={sampleData} height={300} />)
        const total = sampleData.reduce((sum, d) => sum + d.value, 0)
        expect(screen.getByText(total.toString())).toBeInTheDocument()
    })

    it('uses the provided color prop for all arcs', async () => {
        render(
            <DonutGraphD3Js
                title="Colors"
                data={sampleData}
                height={300}
                color="#123456"
            />
        )
        const svg = screen.getByTestId('donut-graph-svg-d3')
        await waitFor(() => {
            const paths = svg.querySelectorAll('path')
            paths.forEach((path) => {
                expect(path.getAttribute('fill')).toBe('#123456')
            })
        })
    })
})

describe('DonutGraphRecharts', () => {
    const sampleData = [
        { name: 'A', value: 10 },
        { name: 'B', value: 20 },
        { name: 'C', value: 30 },
    ]

    it('renders the title', () => {
        render(
            <DonutGraphRecharts
                title="My Donut"
                data={sampleData}
                height={300}
            />
        )
        expect(screen.getByText('My Donut')).toBeInTheDocument()
    })

    it('renders svg when `data` prop is provided', () => {
        render(
            <DonutGraphRecharts
                title="My Donut"
                data={sampleData}
                height={300}
            />
        )
        const svg = screen.getByTestId('donut-graph-svg-recharts')
        expect(svg).toBeInTheDocument()
    })

    it('renders one arc path per data item', async () => {
        render(
            <DonutGraphRecharts title="Arcs" data={sampleData} height={300} />
        )
        const svg = screen.getByTestId('donut-graph-svg-recharts')
        await waitFor(() => {
            const arcs = svg.querySelectorAll('path')
            expect(arcs.length).toBe(sampleData.length)
        })
    })

    it('displays the total value in the center', () => {
        render(
            <DonutGraphRecharts title="Total" data={sampleData} height={300} />
        )
        const total = sampleData.reduce((sum, d) => sum + d.value, 0)
        expect(screen.getByText(total.toString())).toBeInTheDocument()
    })

    it('uses the provided color prop for all arcs', async () => {
        render(
            <DonutGraphRecharts
                title="Colors"
                data={sampleData}
                height={300}
                color="#123456"
            />
        )
        const svg = screen.getByTestId('donut-graph-svg-recharts')
        await waitFor(() => {
            const paths = svg.querySelectorAll('path')
            paths.forEach((path) => {
                expect(path.getAttribute('fill')).toBe('#123456')
            })
        })
    })
})
