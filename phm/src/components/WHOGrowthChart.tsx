import React, { useState } from 'react';
import type { WHOGrowthPayload } from '../types/models';

interface GrowthDataPoint {
  ageInMonths: number;
  sdNeg3: number;
  sdNeg2: number;
  sdNeg1: number;
  median: number;
  sdPos1: number;
  sdPos2: number;
  sdPos3: number;
}

interface Observation {
  dateOfVisit: string;
  ageMonth: number;
  weight: number;
  height: number;
  weightStatus: string;
  heightStatus: string;
}

type ChartType = 'height' | 'weight';

const STATUS_COLORS: Record<string, string> = {
  normal: '#22c55e',
  overweight: '#f97316',
  obese: '#ef4444',
  underweight: '#eab308',
  stunted: '#ef4444',
  tall: '#3b82f6',
};

const CHART_CONFIG = {
  height: 300,
  marginTop: 20,
  marginRight: 30,
  marginBottom: 50,
  marginLeft: 55,
};

function useChartDimensions(containerWidth: number) {
  const { height, marginTop, marginRight, marginBottom, marginLeft } = CHART_CONFIG;
  const innerWidth = containerWidth - marginLeft - marginRight;
  const innerHeight = height - marginTop - marginBottom;
  return { innerWidth, innerHeight, marginTop, marginRight, marginBottom, marginLeft };
}

function scaleX(value: number, min: number, max: number, width: number): number {
  return ((value - min) / (max - min)) * width;
}

function scaleY(value: number, min: number, max: number, height: number): number {
  return height - ((value - min) / (max - min)) * height;
}

function buildPath(points: [number, number][]): string {
  return points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
}

function buildAreaPath(upper: [number, number][], lower: [number, number][]): string {
  const top = upper.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  const bottom = [...lower].reverse().map(([x, y]) => `L ${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  return `${top} ${bottom} Z`;
}

interface GrowthChartProps {
  chartType: ChartType;
  data: GrowthDataPoint[];
  observations: Observation[];
  containerWidth: number;
}

function GrowthChart({ chartType, data, observations, containerWidth }: GrowthChartProps) {
  const { innerWidth, innerHeight, marginTop, marginLeft, marginBottom } = useChartDimensions(containerWidth);

  const isHeight = chartType === 'height';
  const valueKey = isHeight ? 'height' : 'weight';
  const statusKey = isHeight ? 'heightStatus' : 'weightStatus';

  const allAges = data.map((d) => d.ageInMonths);
  const minAge = Math.min(...allAges);
  const maxAge = Math.max(...allAges);

  const allValues = [
    ...data.map((d) => d.sdNeg2).filter(Boolean),
    ...data.map((d) => d.sdPos2).filter(Boolean),
    ...data.map((d) => d.median),
    ...observations.map((o) => o[valueKey]),
  ];
  const minVal = Math.min(...allValues) * 0.95;
  const maxVal = Math.max(...allValues) * 1.05;

  const sx = (v: number) => scaleX(v, minAge, maxAge, innerWidth);
  const sy = (v: number) => scaleY(v, minVal, maxVal, innerHeight);

  const medianPts: [number, number][] = data.map((d) => [sx(d.ageInMonths), sy(d.median)]);
  const sd2PlusPts: [number, number][] = data.map((d) => [sx(d.ageInMonths), sy(d.sdPos2)]);
  const sd2MinusPts: [number, number][] = data.map((d) => [sx(d.ageInMonths), sy(d.sdNeg2)]);

  const yTicks = 5;
  const yTickValues = Array.from({ length: yTicks + 1 }, (_, i) => minVal + ((maxVal - minVal) * i) / yTicks);

  const xTicks = data.map((d) => d.ageInMonths);

  return (
    <svg width={containerWidth} height={CHART_CONFIG.height} role="img" aria-label={`WHO ${isHeight ? 'height' : 'weight'} for age growth chart`}>
      <g transform={`translate(${marginLeft}, ${marginTop})`}>
        {/* SD bands background */}
        <path d={buildAreaPath(sd2PlusPts, sd2MinusPts)} fill="#dbeafe" fillOpacity={0.4} />

        {/* Median to +2SD */}
        <path d={buildAreaPath(sd2PlusPts, medianPts)} fill="#fef9c3" fillOpacity={0.5} />

        {/* -2SD to Median */}
        <path d={buildAreaPath(medianPts, sd2MinusPts)} fill="#fef9c3" fillOpacity={0.5} />

        {/* Grid lines */}
        {yTickValues.map((v, i) => (
          <line key={i} x1={0} x2={innerWidth} y1={sy(v)} y2={sy(v)} stroke="#e5e7eb" strokeWidth={0.5} />
        ))}

        {/* +2SD line */}
        <path d={buildPath(sd2PlusPts)} fill="none" stroke="#93c5fd" strokeWidth={1.5} strokeDasharray="5,3" />

        {/* -2SD line */}
        <path d={buildPath(sd2MinusPts)} fill="none" stroke="#93c5fd" strokeWidth={1.5} strokeDasharray="5,3" />

        {/* Median line */}
        <path d={buildPath(medianPts)} fill="none" stroke="#3b82f6" strokeWidth={2} />

        {/* Y-axis */}
        <line x1={0} x2={0} y1={0} y2={innerHeight} stroke="#9ca3af" strokeWidth={1} />

        {/* X-axis */}
        <line x1={0} x2={innerWidth} y1={innerHeight} y2={innerHeight} stroke="#9ca3af" strokeWidth={1} />

        {/* Y ticks + labels */}
        {yTickValues.map((v, i) => (
          <g key={i} transform={`translate(0, ${sy(v)})`}>
            <line x1={-4} x2={0} stroke="#9ca3af" strokeWidth={1} />
            <text x={-8} textAnchor="end" dominantBaseline="middle" fontSize={11} fill="#6b7280">
              {v.toFixed(isHeight ? 0 : 1)}
            </text>
          </g>
        ))}

        {/* X ticks + labels */}
        {xTicks.map((age) => (
          <g key={age} transform={`translate(${sx(age)}, ${innerHeight})`}>
            <line y1={0} y2={4} stroke="#9ca3af" strokeWidth={1} />
            <text y={16} textAnchor="middle" fontSize={11} fill="#6b7280">
              {age}
            </text>
          </g>
        ))}

        {/* Axis labels */}
        <text x={innerWidth / 2} y={innerHeight + marginBottom - 8} textAnchor="middle" fontSize={12} fill="#374151">
          Age (months)
        </text>
        <text transform={`translate(-42, ${innerHeight / 2}) rotate(-90)`} textAnchor="middle" fontSize={12} fill="#374151">
          {isHeight ? 'Height (cm)' : 'Weight (kg)'}
        </text>

        {/* Observation points */}
        {observations.map((obs, i) => {
          const obsValue = obs[valueKey];
          const status = obs[statusKey];
          const cx = sx(obs.ageMonth);
          const cy = sy(obsValue);
          const color = STATUS_COLORS[status] ?? '#6b7280';

          return (
            <g key={i}>
              <circle cx={cx} cy={cy} r={6} fill={color} stroke="white" strokeWidth={2} />
              <text x={cx} y={cy - 11} textAnchor="middle" fontSize={10} fill={color} fontWeight="500">
                {obsValue} {isHeight ? 'cm' : 'kg'}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}

function StatusBadge({ status }: { status: string }) {
  const color = STATUS_COLORS[status] ?? '#6b7280';
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '2px 8px',
        borderRadius: 4,
        fontSize: 11,
        fontWeight: 500,
        background: color + '22',
        color,
        border: `1px solid ${color}55`,
      }}
    >
      {status}
    </span>
  );
}

export const WHOGrowthChart: React.FC<{ data: WHOGrowthPayload }> = ({ data }) => {
  const [activeChart, setActiveChart] = useState<ChartType>('height');
  const CONTAINER_WIDTH = 680;

  const chartData = activeChart === 'height' ? data.indicators.height_for_age : data.indicators.weight_for_age;

  console.log('[WHOGrowthChart] Rendering with data:', { childId: data.childId, sex: data.sex, chartType: activeChart });

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: CONTAINER_WIDTH, margin: '0 auto', padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 500, color: '#111827' }}>WHO Growth Chart</h2>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#6b7280' }}>
            {data.sex.charAt(0).toUpperCase() + data.sex.slice(1)} · {data.childId}
          </p>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          {(['height', 'weight'] as ChartType[]).map((type) => (
            <button
              key={type}
              onClick={() => setActiveChart(type)}
              style={{
                padding: '6px 14px',
                borderRadius: 6,
                border: '0.5px solid',
                borderColor: activeChart === type ? '#3b82f6' : '#d1d5db',
                background: activeChart === type ? '#eff6ff' : 'transparent',
                color: activeChart === type ? '#1d4ed8' : '#374151',
                fontSize: 13,
                cursor: 'pointer',
                fontWeight: activeChart === type ? 500 : 400,
              }}
            >
              {type === 'height' ? 'Height-for-age' : 'Weight-for-age'}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 12, fontSize: 12, color: '#6b7280', flexWrap: 'wrap' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ display: 'inline-block', width: 24, height: 2, background: '#3b82f6' }} />
          Median
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ display: 'inline-block', width: 24, height: 2, background: '#93c5fd', borderTop: '2px dashed #93c5fd' }} />
          ±2 SD
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', background: '#22c55e' }} />
          Normal
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', background: '#f97316' }} />
          Overweight
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
          Stunted
        </span>
      </div>

      {/* Chart */}
      <div style={{ border: '0.5px solid #e5e7eb', borderRadius: 8, overflow: 'hidden', background: '#fff' }}>
        <GrowthChart chartType={activeChart} data={chartData} observations={data.observations} containerWidth={CONTAINER_WIDTH} />
      </div>

      {/* Observations table */}
      <div style={{ marginTop: 20 }}>
        <h3 style={{ fontSize: 14, fontWeight: 500, color: '#374151', marginBottom: 8 }}>Visit observations</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', fontSize: 13, borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '0.5px solid #e5e7eb' }}>
                {['Date', 'Age (mo)', 'Weight (kg)', 'Weight status', 'Height (cm)', 'Height status'].map((h) => (
                  <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: '#6b7280', fontWeight: 500 }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.observations.map((obs, i) => (
                <tr key={i} style={{ borderBottom: '0.5px solid #f3f4f6' }}>
                  <td style={{ padding: '8px 12px', color: '#374151' }}>{obs.dateOfVisit}</td>
                  <td style={{ padding: '8px 12px', color: '#374151' }}>{obs.ageMonth}</td>
                  <td style={{ padding: '8px 12px', color: '#374151' }}>{obs.weight}</td>
                  <td style={{ padding: '8px 12px' }}>
                    <StatusBadge status={obs.weightStatus} />
                  </td>
                  <td style={{ padding: '8px 12px', color: '#374151' }}>{obs.height}</td>
                  <td style={{ padding: '8px 12px' }}>
                    <StatusBadge status={obs.heightStatus} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

