import React from 'react';
import PropTypes from 'prop-types';
import DataTable from 'react-data-table-component';

const DicomInfoOutput = ({value, columns, onChange}) => (
  <div className="alert alert-primary" hidden={value ? false : true}>
    <DataTable
      data={value}
      columns={columns}
      title="Dicom Info"
      selectableRows
      Clicked
      onSelectedRowsChange={onChange}
    />
  </div>
);

export default DicomInfoOutput;
