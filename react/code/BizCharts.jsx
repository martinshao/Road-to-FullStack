
const { Chart, Axis, Geom, Tooltip, Legend } = window.BizCharts;

const data = [
  {
    x: '2018.11.10',
    y1: 2,
    y2: 5,
  },
  {
    x: '2018.11.11',
    y1: 1,
    y2: 3,
  },
  {
    x: '2018.11.12',
    y1: 4,
    y2: 3,
  },
  {
    x: '2018.11.13',
    y1: 2,
    y2: 2,
  },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['y1', 'y2'], // 展开字段集
  key: 'type', // key字段
  value: 'value', // value字段
});

console.log(dv);
ReactDOM.render((
  <Chart height={400} data={dv} forceFit scale={{ x: { type: 'timeCat' } }}>
    <Axis name="label" label={{ offset: 12 }} />
    <Tooltip />
    <Geom
      type="interval"
      position="x*value"
      color={'type'}
      adjust={[
        {
          type: "dodge",
          marginRatio: 1 / 32
        }
      ]}
    />
  </Chart>
), document.getElementById("mountNode"));
