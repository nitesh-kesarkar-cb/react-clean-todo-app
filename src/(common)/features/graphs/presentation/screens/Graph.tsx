import { useAuthContext } from '../../../../../shared/hoc/useAuthContext';

import { D3JsLineGraph, D3JsDonutGraph, D3JsHistogramGraph, D3JsBarGraph, D3JsScatterGraph, D3JsPieGraph } from '@/d3js';
import { RechartsBarGraph, RechartsDonutGraph, RechartsHistogramGraph, RechartsLineGraph, RechartsPieGraph,  RechartsScatterGraph} from '@/recharts';

import { useGraphViewModel } from '../../hooks/useGraphViewModal';

import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/shadcn/components/ui/tabs';


const GraphPage = () => {
  const { user } = useAuthContext();
  const { useLineGraphQuery, useBarGraphQuery, usePieGraphQuery, useHistogramGraphQuery, useDonutGraphQuery, useScatterGraphQuery } = useGraphViewModel();

  const { data: lineGraphData, isLoading: lineGraphLoading } = useLineGraphQuery();
  const { data: barGraphData, isLoading: barGraphLoading } = useBarGraphQuery();
  const { data: pieGraphData, isLoading: pieGraphLoading } = usePieGraphQuery();
  const { data: histogramGraphData, isLoading: histogramGraphLoading } = useHistogramGraphQuery();
  const { data: donutGraphData, isLoading: donutGraphLoading } = useDonutGraphQuery();
  const { data: scatterGraphData, isLoading: scatterGraphLoading } = useScatterGraphQuery();


  return (
    <div className="mt-10 bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">User Profile</h2>
      {user && (
        <div>
          <div className="mb-4">
            <div className="flex flex-col gap-2">
              <span className="font-semibold">Name:</span>
              <span>{user.name}</span>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <span className="font-semibold">Role:</span>
              <span>{user.role}</span>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-6 text-center">Graphs</h2>

      <Tabs defaultValue="shadcn" className="w-full">
        <TabsList>
          <TabsTrigger value="d3js">D3.js</TabsTrigger>
          <TabsTrigger value="shadcn">Shadcn</TabsTrigger>
        </TabsList>
        <TabsContent value="d3js">
          <div className="space-y-8">
            <div className="mt-10">
              <h3 className="text-xl font-semibold mb-4 text-center">D3JS Activity Graphs</h3>
              <div className=" gap-8">
                {lineGraphLoading ? (
                  lineGraphData && <div className="w-full bg-gray-50 rounded-lg p-4 flex flex-col items-center">
                    <span className="text-gray-500">Loading Line Graph...</span>
                  </div>
                ) : (
                  lineGraphData && <div className="w-full bg-gray-50 rounded-lg p-4 flex flex-col items-center">
                    <D3JsLineGraph data={lineGraphData.data} title={lineGraphData.title} height={400} />
                  </div>
                )}
                {barGraphLoading ? (
                  barGraphData && <div className="w-full bg-gray-50 rounded-lg p-4 flex flex-col items-center">
                    <span className="text-gray-500">Loading Bar Chart ...</span>
                  </div>
                ) : (
                  barGraphData && <div className="w-full bg-gray-50 rounded-lg p-4 flex flex-col items-center">
                    <D3JsBarGraph dataUrl={barGraphData.dataUrl as string} title={barGraphData.title} height={400}/>
                  </div>
                )}

                {pieGraphLoading ? (
                  pieGraphData && <div className="w-full bg-gray-50 rounded-lg p-4 flex flex-col items-center">
                    <span className="text-gray-500">Loading Pie Chart ...</span>
                  </div>
                ) : (
                  pieGraphData && <div className="w-full bg-gray-50 rounded-lg p-4 flex flex-col items-center">
                    <D3JsPieGraph data={pieGraphData.pieData} title={pieGraphData.title}  height={400}/>
                  </div>
                )}

                {histogramGraphLoading ? (
                  histogramGraphData && <div className="w-full bg-gray-50 rounded-lg p-4 flex flex-col items-center">
                    <span className="text-gray-500">Loading Histogram Chart ...</span>
                  </div>
                ) : (
                  histogramGraphData && <div className="w-full bg-gray-50 rounded-lg p-4 flex flex-col items-center">
                    <D3JsHistogramGraph data={histogramGraphData} title="Histogram Graph" height={400} />
                  </div>
                )}

                {donutGraphLoading ? (
                  donutGraphData && <div className="w-full bg-gray-50 rounded-lg p-4 flex flex-col items-center">
                    <span className="text-gray-500">Loading Donut Chart ...</span>
                  </div>
                ) : (
                  donutGraphData && <div className="w-full bg-gray-50 rounded-lg p-4 flex flex-col items-center">
                    <D3JsDonutGraph data={donutGraphData.data} title={donutGraphData.title} height={400} />
                  </div>
                )}

                {scatterGraphLoading ? (
                  scatterGraphData && <div className="w-full bg-gray-50 rounded-lg p-4 flex flex-col items-center">
                    <span className="text-gray-500">Loading Scatter Chart ...</span>
                  </div>
                ) : (
                  scatterGraphData && <div className="w-full bg-gray-50 rounded-lg p-4 flex flex-col items-center">
                    <D3JsScatterGraph data={scatterGraphData.data} title={scatterGraphData.title} height={400} />
                  </div>
                )}

              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="shadcn">
          <div className="space-y-8">
            <div className="space-y-8">
            <div className="mt-10">
              <h3 className="text-xl font-semibold mb-4 text-center">ShadCN Activity Graphs</h3>
              <div className=" gap-8">
                {lineGraphLoading ? (
                  <div className="w-full bg-gray-50 rounded-lg p-4 flex flex-col items-center">
                    <span className="text-gray-500">Loading Line Graph...</span>
                  </div>
                ) : (
                  lineGraphData && <div className="w-full bg-gray-50 rounded-lg p-4 flex flex-col items-center">
                    <RechartsLineGraph data={lineGraphData.data} title={lineGraphData.title} height={400} />
                  </div>
                )}
                {barGraphLoading ? (
                  <div className="w-full bg-gray-50 rounded-lg p-4 flex flex-col items-center">
                    <span className="text-gray-500">Loading Bar Chart ...</span>
                  </div>
                ) : (
                  barGraphData && <div className="w-full bg-gray-50 rounded-lg p-4 flex flex-col items-center">
                    <RechartsBarGraph dataUrl={barGraphData.dataUrl as string} title={barGraphData.title} height={400} />
                  </div>
                )}

                {pieGraphLoading ? (
                  <div className="w-full bg-gray-50 rounded-lg p-4 flex flex-col items-center">
                    <span className="text-gray-500">Loading Pie Chart ...</span>
                  </div>
                ) : (
                  pieGraphData && <div className="w-full bg-gray-50 rounded-lg p-4 flex flex-col items-center">
                    <RechartsPieGraph data={pieGraphData.pieData} title={pieGraphData.title}  height={400}/>
                  </div>
                )}

                {histogramGraphLoading ? (
                  <div className="w-full bg-gray-50 rounded-lg p-4 flex flex-col items-center">
                    <span className="text-gray-500">Loading Histogram Chart ...</span>
                  </div>
                ) : (
                  histogramGraphData && <div className="w-full bg-gray-50 rounded-lg p-4 flex flex-col items-center">
                    <RechartsHistogramGraph data={histogramGraphData.bins} title="Histogram Graph" height={400} />
                  </div>
                )}

                {donutGraphLoading ? (
                  <div className="w-full bg-gray-50 rounded-lg p-4 flex flex-col items-center">
                    <span className="text-gray-500">Loading Donut Chart ...</span>
                  </div>
                ) : (
                  donutGraphData && <div className="w-full bg-gray-50 rounded-lg p-4 flex flex-col items-center">
                    <RechartsDonutGraph data={donutGraphData.data} title={donutGraphData.title} height={400}/>
                  </div>
                )}

                {scatterGraphLoading ? (
                  <div className="w-full bg-gray-50 rounded-lg p-4 flex flex-col items-center">
                    <span className="text-gray-500">Loading Scatter Chart ...</span>
                  </div>
                ) : (
                  scatterGraphData && <div className="w-full bg-gray-50 rounded-lg p-4 flex flex-col items-center">
                    <RechartsScatterGraph data={scatterGraphData.data} title={scatterGraphData.title} height={400}/>
                  </div>
                )}

              </div>
            </div>
          </div>
          </div>
        </TabsContent>
      </Tabs>


    </div>
  );
};

export default GraphPage;

