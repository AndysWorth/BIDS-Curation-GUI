import React from 'react';
import PropTypes from 'prop-types';
import DataTable from 'react-data-table-component';
import { bidsTypes } from './utils';

class SelectBidsTypes extends React.Component {
  render() {
    const typeCheckboxes = []
    Object.keys(bidsTypes).map(x => {
      typeCheckboxes.push(<h3 key={x}>{x}</h3>)
      bidsTypes[x].map((y) => {
          typeCheckboxes.push(
            <span className="bidsTypeCheckbox" key={x + y}>
              <label>{y + ': '}</label>
              <input type="checkbox" value={this.props.bidsTypesValues[x][y].active} onChange={this.props.updateBidsTypes(x, y)} />
           </span>
        );
      });
    });

  return (
    <div>
      {typeCheckboxes}
    </div>
  )}
}

export default SelectBidsTypes;
