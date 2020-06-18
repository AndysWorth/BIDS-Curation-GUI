import React from 'react';
import PropTypes from 'prop-types';
import DataTable from 'react-data-table-component';
import StepZilla from "react-stepzilla";

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

    let steps = [];
    let bidsTypes = this.props.bidsTypes;
    Object.keys(bidsTypes).map(x => {
      Object.keys(bidsTypes[x]).map(y => {
        if (bidsTypes[x][y].active) {
          steps.push({
            name: x + '-' + y,
            component: <DataTable
                  data={data}
                  columns={this.props.columns}
                  title={'Select files for ' + x + '-' + y}
                  selectableRows
                  Clicked
                  onSelectedRowsChange={this.props.onChange}
                />
          });
        }
      });
    });

    return (
      <div>
        <h3> Filter Dicom Rows </h3>
        Remove derived rows: <input type="checkbox" checked={this.state.filterByDerived} onChange={(e) => this.setState({filterByDerived: e.target.checked})} /><br />
        Remove motion corrected rows: <input type="checkbox" checked={this.state.filterMC} onChange={(e) => this.setState({filterMC: e.target.checked})} /><br />
        {steps.length > 0 &&
        <div className='example'>
          <div className='step-progress'>
              <StepZilla steps={steps} />
          </div>
        </div>
        }
        {steps.length === 0 &&
          <h1>Please select modality types to convert to.</h1>
        }
      </div>
    )};
}

/* DataTable before bidsTypes selection/step wizard added
        <DataTable
          data={data}
          columns={this.props.columns}
          title="Dicom Info"
          selectableRows
          Clicked
          onSelectedRowsChange={this.props.onChange}
        />
*/

export default DicomInfoOutput;
