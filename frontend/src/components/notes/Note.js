import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { deleteNote, updateNote } from "./NotesActions";

import { CommonButton } from "../../utils/Common";

class Note extends Component {
  onDeleteClick = () => {
    const { note } = this.props;
    this.props.deleteNote(note.id);
  };
  onUpperCaseClick = () => {
    const { note } = this.props;
    this.props.updateNote(note.id, {
      content: note.content.toUpperCase()
    });
  };
  onLowerCaseClick = () => {
    const { note } = this.props;
    this.props.updateNote(note.id, {
      content: note.content.toLowerCase()
    });
  };
  render() {
    const { note } = this.props;
    return (
      <div>
        <hr />
        <p>(id:{note.id}) {note.content}</p>
        <CommonButton color="default" onClick={this.onUpperCaseClick}>
          Upper Case
        </CommonButton>{" "}
        <CommonButton color="default" onClick={this.onLowerCaseClick}>
          Lower Case
        </CommonButton>{" "}
        <CommonButton color="secondary" onClick={this.onDeleteClick}>
          Delete
        </CommonButton>
        <br /><br />
      </div>
    );
  }
}

Note.propTypes = {
  note: PropTypes.object.isRequired
};
const mapStateToProps = state => ({});

export default connect(mapStateToProps, { deleteNote, updateNote })(
  withRouter(Note)
);