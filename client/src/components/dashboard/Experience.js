import React, { Component } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import Moment from "react-moment"; // for formating date
import { deleteExpAction } from "../../actions/profileActions"; // delete Exp Action

class Experience extends Component {
  constructor() {
    super();
    console.log("Experience constructor started.");
  }
  // pass in the exp id of the one we want delete,
  // then it should redirect to
  onDeleteClick(id) {
    console.log("delete experience clicked");
    this.props.deleteExpAction(id);
  }

  render() {
    const experience = this.props.experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
          {exp.to === null ? (
            " Now"
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={this.onDeleteClick.bind(this, exp._id)}
          >
            DELETE
          </button>
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

Experience.propTypes = {
  deleteExpAction: propTypes.func.isRequired
};

export default connect(
  null,
  { deleteExpAction }
)(Experience);
