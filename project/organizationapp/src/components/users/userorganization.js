// @flow
import React from 'react';
import ReactOnRails from 'react-on-rails';
import UserActions from '../../core/actions/useractions';
import EntryContainer from './children/entrycontainer';
import './styles/userorganization.css';

type Props = {};

class UserOrganization extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      entries: [],
      id: null,
      firstName: '',
      lastName: '',
      title: '',
      managerID: null,
      request: 'full',
    };
  }

  state: {
    entries: Object,
    id: number,
    firstName: string,
    lastName: string,
    title: string,
    managerID: number,
    request: string,
  };

  componentDidMount() {
    this._reloadList();
  }

  _reloadList() {
    const { id, request } = this.state;

    if (request === 'full' || request === 'add') {
      UserActions.showAllList().then((json) => {
        this.setState({ entries: json.data, });
      });
    } else if (request === 'select' || request === 'selected') {
      UserActions.showSelectList(id).then((json) => {
        this.setState({ entries: json.data, });
      });
    }
  }

  sortOrganHierarchy(entries) {
    if (this.state.request !== 'selected') {
      let parentNode = null;
      let childNode = null;
      let roots = [];

      for (let i = 0; i < entries.length; i++) {
        parentNode = entries[i];

        if (parentNode.manager_id === null) {
          roots.push(parentNode);
        }

        for (let k = entries.length - 1; k > 0; k--) {
          childNode = entries[k];
          if (
            (childNode.manager_id !== null)
            &&
            (parentNode.id.toString() === childNode.manager_id.toString().split('.0')[0])
          ) {
            roots.push(childNode);
          }
        }
      }

      return roots;
    } else {
      return entries;
    }
  }

  props: Props;
  _UserOrganizationForm: HTMLFormElement;

  render() {
    const { entries, id, firstName, lastName, title, managerID, request } = this.state;
    let newEntries = {};
    let formComponent = null;
    let entrycontainer = [];
    let descriptiontText = '';

    let submitButton = (
      <button
        id='form-submit-button'
        value='Submit'
        className='submitButtonStyle'
        style={{ margin: 0 }}
      >
        Submit
      </button>
    );

    if (request === 'full') {
      submitButton = (
        <h1 style={{ color: '#5d8fc0' }}>
          Managment Hierarchy
        </h1>
      );
    }

    if (entries !== null && entries !== undefined) {
      newEntries = this.sortOrganHierarchy(entries);

      for (const entry of newEntries) {
        entrycontainer.push(
          <EntryContainer
            id={entry.id}
            firstName={entry.first_name}
            lastName={entry.last_name}
            title={entry.title}
            managerID={entry.manager_id}
          />
        );
      }
    }

    if (request === 'add') {
      descriptiontText = 'Please add a new user here.'

      formComponent = (
        <div id='add-user-container' className='addUserContainerStyle'>
          <input
            placeholder='First name'
            autoFocus='autofocus'
            name='first_name_user'
            id='add-user-first-name-input'
            value={firstName}
            onChange={(event: Object) => {
              const value = 'firstName';
              const newState = {};
              newState[value] = event.target.value;
              this.setState(newState);
            }}
            type='text'
            required={true}
            className='inputStyle'
          />
          <input
            placeholder='Last name'
            autoFocus='autofocus'
            name='last_name_user'
            id='add-user-last-name-input'
            value={lastName}
            onChange={(event: Object) => {
              const value = 'lastName';
              const newState = {};
              newState[value] = event.target.value;
              this.setState(newState);
            }}
            type='text'
            required={true}
            className='inputStyle'
          />
          <input
            placeholder='Job Title'
            autoFocus='autofocus'
            name='job_title_user'
            id='add-user-job-title-input'
            value={title}
            onChange={(event: Object) => {
              const value = 'title';
              const newState = {};
              newState[value] = event.target.value;
              this.setState(newState);
            }}
            type='text'
            required={true}
            className='inputStyle'
          />
          <input
            placeholder='Manager ID'
            autoFocus='autofocus'
            name='manager_id_user'
            id='add-user-manager-id-input'
            value={managerID}
            onChange={(event: Object) => {
              const value = 'managerID';
              const newState = {};
              newState[value] = event.target.value;
              this.setState(newState);
            }}
            type='text'
            required={false}
            className='inputStyle'
          />
        </div>
      );
    } else if (request === 'select' || request === 'selected') {
      descriptiontText = 'Enter a manager-id to display their employee hierarchy.'

      if (request === 'selected') {
        descriptiontText = `Employee hierarchy of user with id: ${id}.`
      }

      formComponent = (
        <input
          placeholder='Manager ID'
          autoFocus='autofocus'
          name='manager_id'
          id='manager-id-input'
          value={id}
          onChange={(event: Object) => {
            const value = 'id';
            const newState = {};
            newState[value] = event.target.value;
            this.setState(newState);
          }}
          type='text'
          required={true}
          className='inputStyle'
          style={{ margin: 0 }}
        />
      );
    }

    return (
      <div id='user-orgaization-main' className='mainContainerStyle'>
        <div id='top-container' className='topContainerStyle'>
          <button
            onClick={(event: Object) => {
              event.preventDefault();
              this.setState({ request: 'full', });
              this._reloadList();
            }}
            id='button-show-all'
            value='Reload'
            className='topButtonStyle'
            style={{ borderColor: '#c05d79', color: '#c05d79', margin: 0 }}
          >
            Reload
          </button>
          <button
            onClick={(event: Object) => {
              event.preventDefault();
              this.setState({ request: 'select' });
            }}
            id='button-show-select'
            value='View by Manager'
            className='topButtonStyle'
          >
            View by Manager
          </button>
          <button
            onClick={(event: Object) => {
              event.preventDefault();
              this.setState({ request: 'add' });
            }}
            id='button-add-user'
            className='topButtonStyle'
          >
            Add New User
          </button>
        </div>

        <div id='third-container' className='innerContainerStyle'>
          <form
            ref={(UserOrganization) => { this._UserOrganizationForm = UserOrganization; }}
            onSubmit={(event: Object) => {
              event.preventDefault();
              if (request === 'select') {
                this.setState({ id: id, request: 'selected', });
                UserActions.showSelectList(id);
              } else if (request === 'add') {
                UserActions.addUser(firstName, lastName, title, managerID);
                alert('New user has been added.');
              }
              this._reloadList();
            }}
            id='form-main'
            className='formContainerStyle'
          >
            {formComponent}
            {submitButton}
          </form>
        </div>

        <div id='fourth-container' className='descriptionContainerStyle'>
          {descriptiontText}
        </div>

        <br />
        {entrycontainer}
        <br />
      </div>
    );
  }
}

ReactOnRails.register({ UserOrganization });
export default UserOrganization;
