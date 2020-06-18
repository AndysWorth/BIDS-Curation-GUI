import React from 'react';
import PropTypes from 'prop-types';

import DicomInfoOutput from './DisplayDicomInfo';
import SelectBidsTypes from './BidsTypes';
import { bidsTypes, tsvJSON } from './utils';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    let bidsTypesValues = {};
    Object.keys(bidsTypes).map(x => {
      bidsTypes[x].map(y => {
        if (!bidsTypesValues[x]) {
          bidsTypesValues[x] = {};
        }
        bidsTypesValues[x][y] = {active: false, selections: []};
      });
    });

    this.state = {
      dicomInfo: [],
      selectedRows: [],
      bidsTypesValues: bidsTypesValues
    }
  }

  ignoreFields = ['total_files_till_now', 'example_dcm_file', 'unspecified1','unspecified2', 'unspecified3'] 
 
  getDicomInfo() {
    fetch(this.props.homeUrl+ 'static/examples/dicominfo.tsv')
      .then((response) => {
        if(response.status !== 200) {
          console.error('Failed to fetch echo:', response);
          this.setState({dicomInfo: ''});
          return;
        }
        response.text().then((data) => {
          let jsonData = tsvJSON(data);
          let columns = []
          if (jsonData.length) {
            columns = Object.keys(jsonData[0]).filter((x) => !this.ignoreFields.includes(x)).map(x => { return {'name': x, 'selector': x, 'sortable': true}; });
          }
          this.setState({dicomInfo: jsonData, columns: columns});
        });
      })
      .catch((error) => {
        console.error('Exception fetching echo:', error);
        this.setState({dicomInfo: ''});
      });
  }

  dicomSelect(tableState) {
    console.log('Selected Rows: ' + tableState.selectedRows);
    this.setState({'selectedRows': tableState.selectedRows});
  }

  updateBidsTypes = (x, y) => (e) => {
    let bidsTypesValues = this.state.bidsTypesValues;
    bidsTypesValues[x][y].active = e.target.checked;
    this.setState({bidsTypesValues: bidsTypesValues});
  }

  submit = (e) => {
    fetch(this.props.homeUrl+ 'api/submit', {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      body: JSON.stringify(this.state)
    })
    .then(response => console.log(response))
    .catch(error => console.log(error))
  }

  componentDidMount() {
    this.getDicomInfo();
  }

  render() {
    return (
      <div className="App container">
        <h1 className="display-4">BIDS Curation GUI</h1>
        <SelectBidsTypes bidsTypesValues={this.state.bidsTypesValues} updateBidsTypes={this.updateBidsTypes.bind(this)}/>
        <DicomInfoOutput dicomInfoRows={this.state.dicomInfo} columns={this.state.columns} onChange={this.dicomSelect.bind(this)} bidsTypes={this.state.bidsTypesValues}/>
        <button onClick={this.submit}>Submit</button>
      </div>
    )
  }
}

App.propTypes = {
  homeUrl: PropTypes.string.isRequired,
  echoUrl: PropTypes.string.isRequired,
};

export default App;
