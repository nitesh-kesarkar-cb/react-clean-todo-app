import { render, screen, act, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import BarGraphD3JS from '../d3js/BarGraph'

global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        status: 200,
        headers: new Headers(),
        redirected: false,
        url: 'mock-url',
        text: () => Promise.resolve('Country,Value\nX,5\nY,15\n'),
    } as Response)
)

class ResizeObserverMock implements ResizeObserver {
    callback: ResizeObserverCallback
    constructor(callback: ResizeObserverCallback) {
        this.callback = callback
    }
    observe(): void {
        act(() => {
            this.callback(
                [
                    {
                        contentRect: {
                            width: 500,
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

describe('BarGraphD3JS', () => {
    const baseProps = {
        dataUrl: '',
        height: 300,
        xLabel: 'Country',
        yLabel: 'Value',
    }

    it('renders the title and axis labels', async () => {
        await act(async () => {
            render(<BarGraphD3JS {...baseProps} title="My Chart" />)
        })
        expect(screen.getByText('My Chart')).toBeInTheDocument()
        // Axis labels are rendered as SVG text
        const svg = screen.getByTestId('bar-chart-svg-d3')
        await waitFor(() => {
            const labels = svg.querySelectorAll('text')
            const foundX = Array.from(labels).some(
                (el) => el.textContent === 'Country'
            )
            const foundY = Array.from(labels).some(
                (el) => el.textContent === 'Value'
            )
            expect(foundX).toBe(true)
            expect(foundY).toBe(true)
        })
    })

    it('renders svg and bars when `data` prop is provided', async () => {
        const data = [
            { country: 'X', value: 5 },
            { country: 'Y', value: 15 },
        ]
        await act(async () => {
            render(<BarGraphD3JS {...baseProps} data={data} />)
        })
        const svg = screen.getByTestId('bar-chart-svg-d3')
        expect(svg).toBeInTheDocument()
        await waitFor(() => {
            const bars = svg.querySelectorAll('rect')
            expect(bars.length).toBe(data.length)
        })
    })

    it('handles empty data without crashing', async () => {
        await act(async () => {
            render(
                <BarGraphD3JS
                    {...baseProps}
                    data={[]}
                    title="Empty D3 Bar Chart"
                />
            )
        })
        expect(screen.getByText('Empty D3 Bar Chart')).toBeInTheDocument()
        const svg = screen.getByTestId('bar-chart-svg-d3')
        await waitFor(() => {
            const bars = svg.querySelectorAll('rect')
            expect(bars.length).toBe(0)
        })
    })
})
