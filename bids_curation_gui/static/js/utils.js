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

export const bidsTypes = {
  "anat": ['T1w', 'T2w', 'T1rho', 'T1map', 'T2map', 'T2star', 'FLAIR',
           'FLASH', 'PD', 'PDmap', 'PDT2', 'inplaneT1', 'inplaneT2',
           'angio'],
  "func": ['bold', 'sbref'],
  "dwi": ['dwi', 'sbref'],
  "fmap": ['phasediff', 'magnitude', 'fieldmap', 'epi', 'sbref']
};
