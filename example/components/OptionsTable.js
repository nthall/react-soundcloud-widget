import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableHeader,
  TableHeaderColumn,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui';

export default class OptionsTable extends React.Component {
  static propTypes = {
    opts: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  onRowSelection(selectedIndices) {
    const selectedOpts = this.props.opts.map((opt, idx) => ({
      ...opt,
      toggled: selectedIndices.indexOf(idx) > -1 ? true : false,
    }));

    this.props.onChange(selectedOpts);
  }

  render() {
    return (
      <Table
        multiSelectable
        onRowSelection={::this.onRowSelection}>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Parameter</TableHeaderColumn>
            <TableHeaderColumn>Purpose</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody deselectOnClickaway={false}>
          {
            this.props.opts.map(opt =>
              <TableRow selected={opt.toggled} key={opt.name}>
                <TableRowColumn>{opt.name}</TableRowColumn>
                <TableRowColumn>{opt.purpose}</TableRowColumn>
              </TableRow>
            )
          }
        </TableBody>
      </Table>
    );
  }
}
