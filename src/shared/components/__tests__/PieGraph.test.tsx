import { render, screen, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import PieGraph from '../d3js/PieGraph'

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

describe('PieGraph', () => {
    const sampleData = [
        { label: 'Sample A', value: 30 },
        { label: 'Sample B', value: 70 },
        { label: 'Sample C', value: 50 },
    ]

    it('renders the pie graph title', () => {
        render(<PieGraph data={sampleData} title="Pie Test" height={300} />)
        expect(screen.getByText('Pie Test')).toBeInTheDocument()
    })

    it('renders the pie graph', () => {
        render(<PieGraph data={sampleData} title="Pie Test" height={300} />)
        const svg = screen.getByTestId('pie-graph-svg-d3')
        expect(svg).toBeInTheDocument()
    })

    it('renders tooltip on hover', async () => {
        render(<PieGraph data={sampleData} title="Tooltip" height={300} />)
        const svg = screen.getByTestId('pie-graph-svg-d3')
        const slice = Array.from(svg?.querySelectorAll('path') ?? [])[0]
        if (slice) {
            slice.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }))
            expect(
                await screen.findByText(
                    `${sampleData[0].label}: ${sampleData[0].value}`
                )
            ).toBeInTheDocument()
        }
    })

    it('renders the pie graph with correct dimensions', () => {
        render(<PieGraph data={sampleData} title="Dimensions" height={300} />)
        const svg = screen.getByTestId('pie-graph-svg-d3')
        expect(svg).toHaveAttribute('height', '300')
    })
})
