import React, { Component } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import Moment from "react-moment"; // for formating date
import { deleteEduAction } from "../../actions/profileActions"; // delete Exp Action

class Education extends Component {
  // pass in the exp id of the one we want delete,
  // then it should redirect to
  onDeleteClick(id) {
    this.props.deleteEduAction(id);
  }

  render() {
    const education = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>{edu.major}</td>
        <td>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
          {edu.to === null ? (
            " Now"
          ) : (
            <Moment format="YYYY/MM/DD">{edu.to}</Moment>
          )}
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={this.onDeleteClick.bind(this, edu._id)}
          >
            DELETE
          </button>
        </td>
      </tr>
    )); // array of educations passed down from parent component dashboard;

    return (
      <div>
        <h4 className="mb-4">Education Summary</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Major</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{education}</tbody>
        </table>
      </div>
    );
  }
}

Education.propTypes = {
  deleteEduAction: propTypes.func.isRequired
};

export default connect(
  null,
  { deleteEduAction }
)(Education);
