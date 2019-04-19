import React, { Component } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { withRouter } from "react-router-dom";

class Experience extends Component {
  render() {
    const experience = this.props.experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          {exp.from} - {exp.to}
        </td>
        <td>
          <button className="btn btn-danger">DELETE</button>
        </td>
      </tr>
    )); // array of experiences passed down from parent component dashboard;

    return (
      <div>
        <h4 className="mb-4">Experience Summary</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{experience}</tbody>
        </table>
      </div>
    );
  }
}

export default connect(null)(withRouter(Experience));
