import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getUsers } from "./UserActions";

import { H_GetTranslation } from "../../libs/Libs";
import { CommonButton } from "../../libs/Common";


const UserList = (props) => {
  const { users } = props.users;

  props.getUsers();

  const items = users.map(user => {
    return(<li key={user.username}>{user.username}, {user.email}<br /></li>);
  });

  const translation = H_GetTranslation();

  // const userColumns = [
  //   {
  //     field: 'username',
  //     headerName: translation.user.username,
  //     minWidth: 150,
  //     flex: 1,
  //     editable: false,
  //   },
  //   {
  //     field: 'email',
  //     headerName: translation.user.email,
  //     minWidth: 250,
  //     flex: 1,
  //     editable: false,
  //   },
  // ];

  console.log("b");
  return(
    <div>
      <div className="ButtonPanel">
        <CommonButton>{translation.user.newUser}</CommonButton>
        <CommonButton>{translation.user.edit}</CommonButton>
      </div>
      <div className="DataPanel">
        Filter: {props.filter}<br /><br />
        <ul>{items}</ul>
        {/* <CommonDataGrid
          columns={userColumns}
          rows={users}
        /> */}
      </div>
    </div>
  );
}

UserList.propTypes = {
  getUsers: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  users: state.users
});

export default connect(mapStateToProps, {
  getUsers
})(withRouter(UserList));