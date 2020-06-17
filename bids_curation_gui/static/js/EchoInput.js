import React from 'react';
import PropTypes from 'prop-types';

/**
 * Text box component with a submit button.
 *
 * @param {String} value Current value of the text box
 * @param {Function} onChange Change handler for text input
 * @param {Function} onSubmit Form submission handler
    <input autoFocus type="text" className="form-control" placeholder="Enter something" value={value} onChange={onChange}/>
 */
const EchoInput = ({value, onChange, onSubmit}) => (
  <form onSubmit={onSubmit}>
    <div className="form-row">
      <div className="form-group col-sm-11">
        <input autoFocus webkitdirectory="" type="file" className="form-control" value={value} onChange={_onFileSelect.bind(this)}/>
      </div>
      <div className="col-sm-1">
        <button className="btn btn-primary" type="submit">Submit</button>
      </div>
    </div>
  </form>
);

const _onFileSelect = (e) => {
  if (e.target && e.target.files.length > 0) {
    let files = e.target.files
    let results = { list: files }
    this.props.onChange(results)
  }
};


EchoInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default EchoInput;
