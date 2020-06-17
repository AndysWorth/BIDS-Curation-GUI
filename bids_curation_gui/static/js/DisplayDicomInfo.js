import React from 'react';
import PropTypes from 'prop-types';
import DataTable from 'react-data-table-component';

class DicomInfoOutput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterByDerived: true,
      filterMC: true
    }
  }


  render() {
    // memoize this:
    let data = this.props.dicomInfoRows.filter(
      x => !(x.is_derived === 'True' && this.state.filterByDerived)
    ).filter(
      x => !(x.is_motion_corrected === 'True' && this.state.filterMC)
    );
    return (
      <div>
        Remove derived rows: <input type="checkbox" checked={this.state.filterByDerived} onChange={(e) => this.setState({filterByDerived: e.target.checked})} /><br />
        Remove motion corrected rows: <input type="checkbox" checked={this.state.filterMC} onChange={(e) => this.setState({filterMC: e.target.checked})} /><br />
        <DataTable
          data={data}
          columns={this.props.columns}
          title="Dicom Info"
          selectableRows
          Clicked
          onSelectedRowsChange={this.props.onChange}
        />
      </div>
    )};
}

export default DicomInfoOutput;
