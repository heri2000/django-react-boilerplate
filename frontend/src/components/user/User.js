import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getUsers } from "./UserActions";

import { CommonButton, getTabTitle } from "../../libs/Common";
import { H_GetTranslation } from "../../libs/Libs";
import AppContainer from "../appContainer/AppContainer";
import UserFilter from "./UserFilter";

import './User.css';

class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: "",
      currentFilter: "",
      showList: false,
    }
  }

  setFilter = (filter) => {
    this.setState({ filter: filter });
  }

  setCurrentFilter = () => {
    this.setState({ currentFilter: this.state.filter });
  }

  showList() {
    this.setState({ showList: true });
  }

  handleShowRefreshButtonClick = () => {
    this.setCurrentFilter(this.state.filter);
    this.showList();
    this.props.getUsers();
  }

  render() {
    const translation = H_GetTranslation();
    document.title = getTabTitle(translation.user.moduleTitle);
    
    const { users } = this.props.users;
    const items = users.map(user => {
      return(<li key={user.username}>{user.username}, {user.email}<br /></li>);
    });
    
    return( 
      <AppContainer title={translation.user.moduleTitle}>
        <div className="PageContent">
          <UserFilter
            filter={this.state.filter}
            setFilter={this.setFilter}
            handleShowRefreshButtonClick={this.handleShowRefreshButtonClick}
          />
          {this.state.showList ?
            <div>
              <div className="ButtonPanel">
                <CommonButton>{translation.user.newUser}</CommonButton>
                <CommonButton>{translation.user.edit}</CommonButton>
              </div>
              <div className="DataPanel">
                <ul>{items}</ul>
              </div>
            </div>
            : ""
          }
        </div>
      </AppContainer>
    );
  }
}

User.propTypes = {
  getUsers: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  users: state.users
});

export default connect(mapStateToProps, {
  getUsers
})(withRouter(User));
