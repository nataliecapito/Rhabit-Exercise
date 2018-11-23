// @flow
import React from 'react';
import UserActions from '../../../core/actions/useractions';
import '../styles/userorganization.css';

type Props = {
  id: number,
  firstName: string,
  lastName: string,
  title: string,
  managerID: number,
};

export default class EntryContainer extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      id: this.props.id,
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      title: this.props.title,
      managerID: this.props.managerID,
      hover: false,
      isDeleted: false,
    };
    this._handleMouseOver = this.handleMouseOver.bind(this);
    this._handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      id: newProps.id,
      firstName: newProps.firstName,
      lastName: newProps.lastName,
      title: newProps.title,
      managerID: newProps.managerID,
    });
  }

  handleMouseOver() {
    this.setState({ hover: true, });
  }
  handleMouseLeave() {
    this.setState({ hover: !this.state.hover, });
  }

  state: {
    id: number,
    firstName: string,
    lastName: string,
    title: string,
    managerID: number,
    hover: boolean,
  };

  props: Props;

  render() {
    let entryContainerStyle = 'entryContainerStyle';
    let entryInputStyle = 'entryInputStyle';
    let deleteButtonStyle = 'noStyle';
    if (this.state.hover) {
      entryContainerStyle = 'hoverEntryContainerStyle';
      entryInputStyle = 'hoverEntryInputStyle';
      deleteButtonStyle = 'deleteButtonStyle';
    }

    if (this.state.isDeleted) {
      entryContainerStyle = 'noStyle';
    }

    const { id, firstName, lastName, title, managerID } = this.state;

    return (
      <form
        onSubmit={(event: Object) => {
          event.preventDefault();
          UserActions.showUpdatedList(id, firstName, lastName, title, managerID);
          alert(`User ${firstName} ${lastName} has been updated.`);
        }}
        id='entry-container-form'
        className={entryContainerStyle}
        onMouseEnter={this._handleMouseOver}
        onMouseLeave={this._handleMouseLeave}
      >
        <a
          id='remove-user-button'
          className={deleteButtonStyle}
          onClick={(event: Object) => {
            event.preventDefault();
            UserActions.deleteUser(id);
            this.setState({ isDeleted: true });
          }}
        >
          x
        </a>

        {id}
        <input
          placeholder='First name'
          autoFocus='autofocus'
          name='first_name_user'
          id='user-first-name-input'
          value={firstName}
          onChange={(event: Object) => {
            const value = 'firstName';
            const newState = {};
            newState[value] = event.target.value;
            this.setState(newState);
          }}
          type='text'
          required={true}
          className={entryInputStyle}
        />
        <input
          placeholder='Last name'
          autoFocus='autofocus'
          name='last_name_user'
          id='user-last-name-input'
          value={lastName}
          onChange={(event: Object) => {
            const value = 'lastName';
            const newState = {};
            newState[value] = event.target.value;
            this.setState(newState);
          }}
          type='text'
          required={true}
          className={entryInputStyle}
        />
        <input
          placeholder='Job position title'
          autoFocus='autofocus'
          name='job_title_user'
          id='user-job-title-input'
          value={title}
          onChange={(event: Object) => {
            const value = 'title';
            const newState = {};
            newState[value] = event.target.value;
            this.setState(newState);
          }}
          type='text'
          required={true}
          className={entryInputStyle}
        />
        <input
          placeholder='Manager ID'
          autoFocus='autofocus'
          name='manager_id_user'
          id='user-manager-id-input'
          value={managerID}
          onChange={(event: Object) => {
            const value = 'managerID';
            const newState = {};
            newState[value] = event.target.value;
            this.setState(newState);
          }}
          type='text'
          required={false}
          className={entryInputStyle}
        />

        <button
          id='update-button'
          value='Update'
          className='entryButtonStyle'
        >
          Update
        </button>
      </form>
    );
  }
}
