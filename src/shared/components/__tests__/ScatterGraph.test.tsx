import { render, screen, waitFor, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import ScatterGraphD3JS from '../d3js/ScatterGraph'
// import ScatterGraphRecharts from "../recharts/ScatterGraph";

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

describe('ScatterGraphD3JS', () => {
    const sampleData = [
        { date: 1, value: 10 },
        { date: 2, value: 20 },
        { date: 3, value: 30 },
        { date: 4, value: 40 },
    ]

    it('renders the scatter graph title', () => {
        render(
            <ScatterGraphD3JS
                data={sampleData}
                title="Scatter Test"
                height={300}
            />
        )
        expect(screen.getByText('Scatter Test')).toBeInTheDocument()
    })

    it('renders one point per data item', async () => {
        render(
            <ScatterGraphD3JS data={sampleData} title="Points" height={300} />
        )
        const svg = screen.getByTestId('scatter-graph-svg-d3')
        await waitFor(() => {
            const points = svg.querySelectorAll('circle')
            expect(points.length).toBe(sampleData.length)
        })
    })

    it('renders tooltip on hover', async () => {
        render(
            <ScatterGraphD3JS data={sampleData} title="Tooltip" height={300} />
        )
        const svg = screen.getByTestId('scatter-graph-svg-d3')
        const point = Array.from(svg?.querySelectorAll('circle') ?? [])[0]
        if (point) {
            point.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }))
            expect(
                await screen.findByText(sampleData[0].value.toString())
            ).toBeInTheDocument()
        }
    })

    it('renders the scatter graph with correct dimensions', () => {
        render(
            <ScatterGraphD3JS
                data={sampleData}
                title="Dimensions"
                height={300}
            />
        )
        const svg = screen.getByTestId('scatter-graph-svg-d3')
        expect(svg).toHaveAttribute('height', '300')
    })
})

// describe("ScatterGraphRecharts", () => {
//   const sampleData = [
//     { date: 1, value: 10 },
//     { date: 2, value: 20 },
//     { date: 3, value: 30 },
//     { date: 4, value: 40 },
//   ];

//   it("renders the scatter graph title", () => {
//     render(
//       <ScatterGraphRecharts
//         data={sampleData}
//         title="Scatter Test"
//         height={300}
//       />
//     );
//     expect(screen.getByText("Scatter Test")).toBeInTheDocument();
//   });

//   it("renders one point per data item", async () => {
//     render(
//       <ScatterGraphRecharts
//         data={sampleData}
//         title="Points"
//         height={300}
//       />
//     );
//     const svg = screen.getByTestId('scatter-graph-svg-recharts');
//     await waitFor(() => {
//       const points = svg.querySelectorAll('path');
//       expect(points.length).toBe(sampleData.length);
//     });
//   });

//   it("renders tooltip on hover", async () => {
//     render(
//       <ScatterGraphRecharts
//         data={sampleData}
//         title="Tooltip"
//         height={300}
//       />
//     );
//     const svg = screen.getByTestId('scatter-graph-svg-recharts');
//     const point = Array.from(svg?.querySelectorAll('circle') ?? [])[0];
//     if (point) {
//       point.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
//       expect(await screen.findByText(sampleData[0].value.toString())).toBeInTheDocument();
//     }
//   });

//   it("renders the scatter graph with correct dimensions", () => {
//     render(
//       <ScatterGraphRecharts
//         data={sampleData}
//         title="Dimensions"
//         height={300}
//       />
//     );
//     const svg = screen.getByTestId('scatter-graph-svg-recharts');
//     expect(svg).toHaveAttribute('height', '300');
//   });
// });
