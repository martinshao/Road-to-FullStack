import React from 'react';
import { Chart, Axis, Tooltip, Geom, Legend, View } from 'bizcharts';
import DataSet from '@antv/data-set';

// { successRate: '0.1', 放款应还本金: 2800, deployCount: 2 },

const data = [
  { label: '1970-01-11', successRate: '0.1', avgDeployTime: 2800, deployCount: 1000 },
  { label: '1970-01-12', successRate: '0.2', avgDeployTime: 1800, deployCount: 3 },
  { label: '1970-01-13', successRate: '0.3', avgDeployTime: 950, deployCount: 5 },
  { label: '1970-01-14', successRate: '0.4', avgDeployTime: 500, deployCount: 1 },
  { label: '1970-01-15', successRate: '0.5', avgDeployTime: 170, deployCount: 3 },
  { label: '1970-01-16', successRate: '0.6', avgDeployTime: 170, deployCount: 3 },
  { label: '1970-01-17', successRate: '0.7', avgDeployTime: 170, deployCount: 3 },
  { label: '1970-01-18', successRate: '0.8', avgDeployTime: 170, deployCount: 3 },
  { label: '1970-01-19', successRate: '0.9', avgDeployTime: 170, deployCount: 3 },
  { label: '1970-01-20', successRate: '1.0', avgDeployTime: 170, deployCount: 3 },
  { label: '1970-01-21', successRate: '0.9', avgDeployTime: 170, deployCount: 3 },
];
const ds = new DataSet();
ds.setState('type', '');
const dv = ds.createView().source(data);
dv.transform({
    type: 'fold',
    fields: ['avgDeployTime', 'deployCount'], // 展开字段集
    key: 'type', // key字段
    value: 'value', // value字段
  })
  .transform({
    type: 'filter',
    callback: (d) => {
      console.log(ds.state.type);
      return d.type !== ds.state.type;
    },
  })

const scale = {
  successRate: {
    type: 'timeCat',
  },
}

const legendItems = [
  {
    value: 'avgDeployTime',
    marker: {
      symbol: 'square',
      fill: '#3182bd',
      radius: 5,
    },
  },
  {
    value: 'deployCount',
    marker: {
      symbol: 'square',
      fill: '#54ca76',
      radius: 5,
    },
  },
  {
    value: 'successRate',
    marker: {
      symbol: 'hyphen',
      stroke: '#fad248',
      radius: 5,
      lineWidth: 3,
    },
  },
]

export default class Demo extends React.Component {
  render() {
    return (
      <Chart
        height={400}
        width={500}
        forceFit
        data={dv}
        scale={scale}
        padding="auto"
        onGetG2Instance={(c) => {
          this.chart = c;
        }}
      >
        <Legend
          custom
          allowAllCanceled
          items={legendItems}
          onClick={(ev) => {
            setTimeout(() => {
              const checked = ev.checked;
              const value = ev.item.value;
              if (value === 'successRate') {
                if (!checked) {
                  this.chart.get('views')[0].get('geoms')[0].hide()
                } else {
                  this.chart.get('views')[0].get('geoms')[0].show()
                }
              }
              const newLegend = legendItems.map((d) => {
                if (d.value === value) {
                  d.checked = checked
                }
                return d;
              })
              this.chart.filter('type', (t) => {
                const legendCfg = newLegend.find(i => i.value == t);
                return legendCfg && legendCfg.checked;
              });
              this.chart.legend({
                items: newLegend,
              })
              this.chart.repaint();
            }, 0)
          }}
        />
        <Axis name="label" />
        <Axis name="value" position={'left'} />
        <Tooltip />
        <Geom
          type="interval"
          position="label*value"
          color={['type', (value) => {
            if (value === 'avgDeployTime') {
              return '#3182bd';
            }
            if (value === 'deployCount') {
              return '#54ca76';
            }
          }]}
          // adjust={[{
          //   type: 'dodge',
          //   marginRatio: 1 / 32,
          // }]}
        />
        <View data={data} >
          <Axis name="successRate" position="right" />
          <Geom type="line" position="label*successRate" color="#fad248" size={3} />
        </View>
      </Chart>
    );
  }
}
