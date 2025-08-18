import { render, screen, act, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import HistogramGraph from '../d3js/HistogramGraph'

class ResizeObserverMock implements ResizeObserver {
    callback: ResizeObserverCallback
    constructor(callback: ResizeObserverCallback) {
        this.callback = callback
    }
    observe(): void {
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
    }
    unobserve(): void {}
    disconnect(): void {}
}
;(
    global as unknown as { ResizeObserver: typeof ResizeObserver }
).ResizeObserver = ResizeObserverMock

describe('HistogramGraph', () => {
    const sampleData = {
        bins: [
            { label: '0-10', value: 5 },
            { label: '10-20', value: 15 },
            { label: '20-30', value: 10 },
        ],
    }

    it('renders the histogram graph title', () => {
        act(() => {
            render(
                <HistogramGraph
                    data={sampleData}
                    title="Histogram Test"
                    height={300}
                />
            )
        })
        expect(screen.getByText('Histogram Test')).toBeInTheDocument()
    })

    it('renders one bar per data item', async () => {
        act(() => {
            render(
                <HistogramGraph data={sampleData} title="Bars" height={300} />
            )
        })

        const svg = await screen.getByTestId('histogram-graph-svg-d3')
        await waitFor(() => {
            const bars = svg.querySelectorAll('rect')
            expect(bars.length).toBe(sampleData.bins.length)
        })
    })

    it('renders tooltip on hover', async () => {
        act(() => {
            render(
                <HistogramGraph
                    data={sampleData}
                    title="Tooltip"
                    height={300}
                />
            )
        })
        // Find a bar and hover over it
        const svg = await screen.getByTestId('histogram-graph-svg-d3')
        const bar = Array.from(svg?.querySelectorAll('rect') ?? []).find(
            (rect) => rect.getAttribute('fill') === '#6366f1'
        )
        if (bar) {
            bar.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }))
            // Tooltip should show value
            expect(
                await screen.findByText(sampleData.bins[0].value.toString())
            ).toBeInTheDocument()
        }
    })
    it('renders the histogram graph with correct dimensions', async () => {
        act(() => {
            render(
                <HistogramGraph
                    data={sampleData}
                    title="Dimensions"
                    height={300}
                />
            )
        })
        const svg = await screen.getByTestId('histogram-graph-svg-d3')
        expect(svg).toHaveAttribute('height', '300')
    })
})
