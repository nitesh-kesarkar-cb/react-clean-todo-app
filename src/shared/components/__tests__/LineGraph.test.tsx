import { render, screen, waitFor, act, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import LineGraphRecharts from '../recharts/LineGraph'
import LineGraphD3JS from '../d3js/LineGraph'

// Mock ResizeObserver for both D3JS and Recharts graphs
class ResizeObserverMock implements ResizeObserver {
    callback: ResizeObserverCallback
    constructor(callback: ResizeObserverCallback) {
        this.callback = callback
    }
    observe() {
        setTimeout(() => {
            this.callback(
                [
                    {
                        contentRect: {
                            width: 500,
                            height: 300,
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                        },
                    } as ResizeObserverEntry,
                ],
                this
            )
        }, 0)
    }
    unobserve() {}
    disconnect() {}
}
;(
    global as unknown as { ResizeObserver: typeof ResizeObserver }
).ResizeObserver = ResizeObserverMock

describe('LineGraph D3JS', () => {
    const sampleData = [1, 2, 3, 4, 5]
    const baseProps = {
        data: sampleData,
        title: 'Test D3 Line Chart',
        xLabel: 'Time',
        yLabel: 'Value',
        height: 300,
    }

    it('renders title and axis labels', async () => {
        await act(async () => {
            render(<LineGraphD3JS {...baseProps} />)
        })
        expect(screen.getByText('Test D3 Line Chart')).toBeInTheDocument()
        expect(screen.getByText('Time')).toBeInTheDocument()
        expect(screen.getByText('Value')).toBeInTheDocument()
    })

    it('renders svg and line path', async () => {
        await act(async () => {
            render(<LineGraphD3JS {...baseProps} />)
        })
        const svg = screen.getByTestId('line-graph-svg-d3')
        expect(svg).toBeInTheDocument()
        await waitFor(() => {
            const path = svg.querySelector('path')
            expect(path).toBeInTheDocument()
        })
    })

    it('renders correct number of points', async () => {
        await act(async () => {
            render(<LineGraphD3JS {...baseProps} />)
        })
        const svg = screen.getByTestId('line-graph-svg-d3')
        await waitFor(() => {
            const circles = svg.querySelectorAll('circle')
            expect(circles.length).toBe(sampleData.length)
        })
    })

    it('handles empty data without crashing', async () => {
        await act(async () => {
            render(
                <LineGraphD3JS
                    {...baseProps}
                    data={[]}
                    title="Empty D3 Chart"
                />
            )
        })
        expect(screen.getByText('Empty D3 Chart')).toBeInTheDocument()
        const svg = screen.getByTestId('line-graph-svg-d3')
        const path = svg.querySelector('path')
        expect(path).toBeInTheDocument()
        expect(path?.getAttribute('d')).toBe('')
        const circles = svg.querySelectorAll('circle')
        expect(circles.length).toBe(0)
    })
})

describe('LineGraph (Shadcn + Recharts)', () => {
    const sampleData = [1, 2, 3, 4, 5]
    const baseProps = {
        data: sampleData,
        title: 'Test Line Chart',
        xLabel: 'Time',
        yLabel: 'Value',
        height: 300,
    }

    it('renders title and axis labels', async () => {
        await act(async () => {
            render(<LineGraphRecharts {...baseProps} />)
        })
        expect(screen.getByText('Test Line Chart')).toBeInTheDocument()
        // Axis label is rendered as SVG, so use a flexible matcher
        const svgLabels = document.querySelectorAll('text')
        const found = Array.from(svgLabels).some(
            (el) => el.textContent === 'Value'
        )
        expect(found).toBe(true)
    })

    it('renders exactly one line path', async () => {
        await act(async () => {
            render(<LineGraphRecharts {...baseProps} />)
        })
        await waitFor(() => {
            const paths = document.querySelectorAll(
                'path[stroke="var(--chart-1)"]'
            )
            expect(paths.length).toBe(1)
        })
    })

    it('renders tooltip on hover over a point', async () => {
        await act(async () => {
            render(<LineGraphRecharts {...baseProps} />)
        })
        await waitFor(() => {
            const svg = document.querySelector('svg')
            expect(svg).toBeInTheDocument()
            if (svg) {
                fireEvent.mouseOver(svg)
            }
        })
        // Tooltip text should include a value from the data
        await waitFor(() => {
            // Tooltip may be rendered in a div, so use a flexible matcher
            const tooltip = screen.queryByText(sampleData[0].toString())
            expect(tooltip).toBeInTheDocument()
        })
    })

    it('handles empty data without crashing', async () => {
        await act(async () => {
            render(
                <LineGraphRecharts
                    {...baseProps}
                    data={[]}
                    title="Empty Chart"
                />
            )
        })
        expect(screen.getByText('Empty Chart')).toBeInTheDocument()
        const paths = document.querySelectorAll('path[stroke="var(--chart-1)"]')
        expect(paths.length).toBe(0)
    })
})
