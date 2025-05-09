'use client';

import WidgetCard from '@core/components/cards/widget-card';
import { CustomTooltip } from '@core/components/charts/custom-tooltip';
import DropdownAction from '@core/components/charts/dropdown-action';
import TrendingUpIcon from '@core/components/icons/trending-up';
import { useMedia } from '@core/hooks/use-media';
import cn from '@core/utils/class-names';
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Title } from 'rizzui';

const data = [
  {
    label: 'Mon',
    amount: 70,
  },
  {
    label: 'Tue',
    amount: 72,
  },
  {
    label: 'Thu',
    amount: 75,
  },
  {
    label: 'Wed',
    amount: 78,
  },
  {
    label: 'Fri',
    amount: 82,
  },
  {
    label: 'Sat',
    amount: 78,
  },
  {
    label: 'Sun',
    amount: 80,
  },
];

const viewOptions = [
  {
    value: 'Daily',
    label: 'Daily',
  },
  {
    value: 'Monthly',
    label: 'Monthly',
  },
];

export default function CashInBank({ className }: { className?: string }) {
  const isTablet = useMedia('(max-width: 800px)', false);
  function handleChange(viewType: string) {
    console.log('viewType', viewType);
  }

  return (
    <WidgetCard
      title="Cash in Bank"
      titleClassName="text-gray-700 font-normal sm:text-sm font-inter"
      headerClassName="items-center"
      action={
        <DropdownAction
          className="rounded-md border"
          options={viewOptions}
          onChange={handleChange}
          dropdownClassName="!z-0"
        />
      }
      className={cn('min-h-[28rem]', className)}
    >
      <div className="mb-4 mt-1 flex items-center gap-2">
        <Title as="h2" className="font-semibold">
          $750.45k
        </Title>
        <span className="flex items-center gap-1 text-green-dark">
          <TrendingUpIcon className="h-auto w-5" />
          <span className="font-medium leading-none"> +32.40%</span>
        </span>
      </div>
      <div className='custom-scrollbar overflow-x-auto scroll-smooth'>
        <div className="h-[27.3rem] w-full pt-9 @lg:pt-8">
          <ResponsiveContainer
            width="100%"
            height="100%"
            {...(isTablet && { minWidth: '500px' })}
          >
            <ComposedChart
              data={data}
              margin={{
                left: -17,
                top: 27,
              }}
              className="[&_.recharts-tooltip-cursor]:fill-opacity-20 dark:[&_.recharts-tooltip-cursor]:fill-opacity-10 [&_.recharts-cartesian-axis-tick-value]:fill-gray-500 [&_.recharts-cartesian-axis.xAxis]:translate-y-2 [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_path.recharts-rectangle]:!stroke-none"
            >
              <CartesianGrid
                vertical={false}
                strokeOpacity={0.435}
                strokeDasharray="8 10"
              />
              <XAxis dataKey="label" axisLine={false} tickLine={false} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={(label) => `$${label}k`}
              />
              <Tooltip
                content={
                  <CustomTooltip className="[&_.chart-tooltip-item:last-child]:hidden" />
                }
                cursor={false}
              />
              <Bar
                dataKey="amount"
                fill="#3872FA"
                barSize={36}
                radius={[4, 4, 0, 0]}
              />
              <Line
                dataKey="amount"
                className="-translate-y-3"
                stroke="#CDDDFE"
                strokeWidth={3}
                activeDot={false}
                dot={<CustomizedDot />}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </WidgetCard>
  );
}

function CustomizedDot(props: any) {
  const { cx, cy } = props;
  return (
    <svg
      x={cx - 10}
      y={cy - 7}
      width="15"
      height="14"
      viewBox="0 0 15 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="7.03906"
        cy="7"
        r="5.5"
        fill="#3872FA"
        stroke="white"
        strokeWidth="3"
      />
    </svg>
  );
}
