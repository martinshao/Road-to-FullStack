const colsColumns = ['image_url', 'edit_d_single', 'gt_rect_len', 'draw_url'];

const data = [
  {
    showColumns: [
      { name: 'shaowei' },
      { name: 'gt_rect_len' },
      { name: 'draw_url' },
      { name: 'qinshenglin' },
      { name: 'edit_d_single' },
      { name: 'image_url' },
    ],
  },
  {
    showColumns: [{ name: 'image_url' }, { name: 'jack' }, { name: 'rose' }],
  },
];

const result = data.map((item) => {
  const { showColumns } = item;
  const columns = showColumns.reduce(
    (acc, curr) => ((acc[curr.name] = curr), acc),
    {}
  );
  const result = [];
  for (const it of colsColumns) {
    if (columns[it]) result.push(columns[it]);
  }
  item.showColumns = result;
  return item;
});
