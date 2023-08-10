import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from 'components/Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts) this.setState({ contacts });
  }

  componentDidUpdate(prevProps, prevState) {
    const contacts = JSON.stringify(this.state.contacts);

    if (prevState.contacts !== this.state.contacts)
      localStorage.setItem('contacts', contacts);
  }

  addContact = contact => {
    this.setState(prev => ({
      contacts: [...prev.contacts, { ...contact, id: nanoid() }],
    }));
  };

  removeContact = id => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  getFilterNormalize = () => this.state.filter.toLowerCase();

  getFilteredContacts = () =>
    this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.getFilterNormalize())
    );

  render() {
    const { contacts, filter } = this.state;

    return (
      <div
        style={{
          margin: 24,
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm
          contacts={contacts}
          onSubmit={this.addContact}
          handleChange={this.handleChange}
        />
        <h2
          style={{
            fontSize: 28,
          }}
        >
          Contacts
        </h2>
        <Filter filter={filter} handleChange={this.handleChange} />
        <ContactList
          contacts={contacts}
          filteredContacts={this.getFilteredContacts()}
          removeContact={this.removeContact}
        />
      </div>
    );
  }
}
