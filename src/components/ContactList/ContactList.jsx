import PropTypes from 'prop-types';
import ContactItem from 'components/ContactItem';
import { Contacts } from './ContactList.styled';

export const ContactList = ({ filteredContacts, removeContact }) => (
  <Contacts>
    {filteredContacts.map(({ id, name, number }) => (
      <ContactItem
        name={name}
        key={id}
        id={id}
        number={number}
        removeContact={removeContact}
      />
    ))}
  </Contacts>
);

ContactList.propTypes = {
  filteredContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  removeContact: PropTypes.func.isRequired,
};
