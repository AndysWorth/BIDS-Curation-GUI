export const tsvJSON = (tsv) => {
  const lines = tsv.split('\n');
  const headers = lines.shift().split('\t');
  return lines.map(line => {
    const data = line.split('\t');
    return headers.reduce((obj, nextKey, index) => {
      obj[nextKey] = data[index];
      return obj;
    }, {});
  });
};

