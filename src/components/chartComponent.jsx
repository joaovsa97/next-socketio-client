import { useMemo } from "react";
import { Text } from "@visx/text";
import { Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";

const salesData = [
  { month: "jan", value: 1100 },
  { month: "fev", value: 1300 },
  { month: "mar", value: 2000 },
  { month: "abr", value: 1020 },
  { month: "mai", value: 1800 },
  { month: "jun", value: 4000 },
  { month: "jul", value: 4500 },
  { month: "ago", value: 3600 },
  { month: "set", value: 2000 },
  { month: "out", value: 1600 },
  { month: "nov", value: 2200 },
  { month: "dez", value: 900 },
];

export default function Chart() {
  const width = 800;
  const height = 500;
  const margin = { top: 20, bottom: 40, left: 60, right: 20 };

  const data = salesData;

  const getLabel = (d) => d.month;
  const getValue = (d) => d.value;

  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const xScale = useMemo(
    () =>
      scaleBand({
        range: [0, xMax],
        round: true,
        domain: data.map(getLabel),
        padding: 0.4,
      }),
    [xMax, data]
  );

  const yScale = useMemo(
    () =>
      scaleLinear({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...data.map(getValue))],
      }),
    [yMax, data]
  );

  return width < 10 ? null : (
    <svg  width={width} height={height}>
      <Group top={margin.top} left={margin.left}>
        {data.map((d) => {
          const label = getLabel(d);
          const barWidth = xScale.bandwidth();
          const barHeight = yMax - (yScale(getValue(d)) ?? 0);
          const barX = xScale(label);
          const barY = yMax - barHeight;
          return (
            <Bar
              key={`bar-${label}`}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill="rgba(23, 233, 217, .5)"
            />
          );
        })}
        {data.map((d) => {
          const label = getLabel(d);
          const barX = (xScale(label)?.valueOf() ?? 0) + xScale.bandwidth() / 2;
          const barY = yMax + 10;

          return (
            <Text
              key={`label-${label}`}
              x={barX}
              y={barY}
              dy=".33em"
              fontSize={10}
              textAnchor="middle"
              fill="#fff"
            >
              {label}
            </Text>
          );
        })}
        {yScale.ticks().map((tickValue) => {
          const tickX = -10;
          const tickY = yScale(tickValue);
          return (
            <Text
              key={`tick-${tickValue}`}
              x={tickX}
              y={tickY}
              dy=".33em"
              fontSize={10}
              textAnchor="end"
              fill="#fff"
            >
              {tickValue}
            </Text>
          );
        })}
      </Group>
    </svg>
  );
}
