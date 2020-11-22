import React, {useState} from  "react";
import "./CONTACTS.css"
import { Accordion, AccordionDetails, AccordionSummary, Typography  } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import fetchAPI from '../api/index'
import Comments from './COMMENTS'


function Contacts(props) {
    const {contactList, 
            setContactList, 
            setOpen, 
            setName, 
            setAddress,
            setPhoneNumber,
            setEmail,
            setContactType,
            setEdit} = props
    const [expanded, setExpanded] = useState('false');

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

    

    return (contactList.map((contact, index) => {
        return <Accordion key={index} expanded={expanded === index} onChange={handleChange(index)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          expanded={expanded}
        >
          <Typography className="contact-name"><strong>{contact.name}</strong></Typography>
        </AccordionSummary>
        <AccordionDetails className="details">
          <div className="contact-details">

            <Typography>
              <strong>ADDRESS: </strong>{contact.address}<br></br>
              <strong>PHONE NUMBER: </strong>{contact.phoneNumber}<br></br>
              <strong>EMAIL: </strong>{contact.email}<br></br>
              <strong>CONTACT TYPE: </strong>{contact.contactType}<br></br>
            </Typography>
            <div className="icons">
              <DeleteIcon 
                  id="delete" 
                  fontSize="large"
                  onClick={async (event) => {
                      event.preventDefault();
                      fetchAPI(`https://univ-contact-book.herokuapp.com/api/contacts/${contact.id}`, "DELETE")
                      .then(
                          function() {
                            const newList = contactList.filter(person => person.id !== contact.id);
                            setContactList(newList)
                            setExpanded(false)
                          })
                      .catch(console.error);
                  }}
                  ></DeleteIcon>
              <EditIcon  
                  id="edit" 
                  fontSize="large"
                  onClick={(event) => {
                      event.preventDefault();
                      setEdit(contact.id)
                      setOpen(true)
                      setName(contact.name)
                      setAddress(contact.address)
                      setPhoneNumber(contact.phoneNumber)
                      setEmail(contact.email)
                      setContactType(contact.contactType)
                  }
                  }
                  ></EditIcon>
            </div>
          </div>
          <Comments 
            contact={contact}/>
        </AccordionDetails>
        </Accordion>
        
    })
    
    )
    }
    
        


export default Contacts
