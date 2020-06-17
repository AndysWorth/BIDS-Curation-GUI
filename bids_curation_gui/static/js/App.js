import React from 'react';
import PropTypes from 'prop-types';

import DicomInfoOutput from './DisplayDicomInfo';
import { tsvJSON } from './utils';

import './App.css';

/**
 * Simple client-server echo application.
 */
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dicomInfo: '',
      selectedRows: []
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
    this.setState({'selectedRows': tableState.selectedRows});
  }

  componentDidMount() {
    this.getDicomInfo();
  }

  render() {
    console.log(this.state);
    return (
      <div className="App container">
        <h1 className="display-4">BIDS Curation GUI</h1>
        <DicomInfoOutput value={this.state.dicomInfo} columns={this.state.columns} onChange={this.dicomSelect.bind(this)}/>
      </div>
    )
  }
}

App.propTypes = {
  homeUrl: PropTypes.string.isRequired,
  echoUrl: PropTypes.string.isRequired,
};

export default App;
