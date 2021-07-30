import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { FormGroup, FormLabel, TextareaAutosize } from "@material-ui/core";
import { addNote } from "./NotesActions";

import { CommonButton } from "../../libs/Common";

class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ""
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onAddClick = () => {
    const note = {
      content: this.state.content
    };
    this.props.addNote(note);
  };

  render() {
    return (
      <div>
        <h2>Add new note</h2>
        <form>
          <FormGroup>
            <FormLabel>Note</FormLabel>
            <TextareaAutosize
              rows={3}
              name="content"
              placeholder="Enter note"
              value={this.content}
              onChange={this.onChange}
            />
          </FormGroup>
        </form>
        <br />
        <CommonButton
          color="primary"
          onClick={this.onAddClick}
        >
          Add note
        </CommonButton>
        <br /><br /><br />
      </div>
    );
  }
}

AddNote.propTypes = {
  addNote: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { addNote })(withRouter(AddNote));