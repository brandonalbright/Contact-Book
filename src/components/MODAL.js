import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Input from '@material-ui/core/Input';
import MaskedInput from 'react-text-mask';
import fetchAPI from '../api/index'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import AddIcon from '@material-ui/icons/Add';
import './MODAL.css';



function getModalStyle() {

  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ContactModal(props) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  
  const {addNewContact, 
        open, 
        setOpen,
        name,
        setName,
        address,
        setAddress,
        phoneNumber,
        setPhoneNumber,
        email,
        setEmail,
        contactType,
        setContactType,
        edit,
        setEdit,
        updateContact} = props;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} id="modal" className={classes.paper}>
        <form className={classes.root} id="modal-items" noValidate autoComplete="off">
            <Input 
                placeholder="Name" 
                inputProps={{ 'aria-label': 'description' }} 
                value={name}
                onChange={(event) => {
                    setName(event.target.value)
                }}/>
            <Input 
                placeholder="Address" 
                inputProps={{ 'aria-label': 'description' }} 
                value={address}
                onChange={(event) => {
                    setAddress(event.target.value)
                }}/>
            <MaskedInput
                mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                placeholder="Phone Number"
                className="phonenumber"
                inputProps={{ 'aria-label': 'description' }} 
                value={phoneNumber}
                onChange={(event) => {
                    setPhoneNumber(event.target.value)
                }}/>           
            <Input 
                placeholder="Email"  
                inputProps={{ 'aria-label': 'description' }} 
                value={email}
                onChange={(event) => {
                    setEmail(event.target.value)
                }}/>
            <FormControl component="fieldset">
                <FormLabel component="legend">Contact Type</FormLabel>
                <RadioGroup row >
                    <FormControlLabel value="Work" control={<Radio />} label="Work" 
                    onClick={(event) => {
                        setContactType("work")
                        
                    }}/>
                    <FormControlLabel value="Personal" control={<Radio />} label="Personal" 
                    onClick={(event) => {
                        setContactType("personal")
                        
                    }}/>
                    <FormControlLabel value="Other" control={<Radio />} label="Other" 
                    onClick={(event) => {
                        setContactType("other")
                        
                    }}/>
                </RadioGroup>
            </FormControl>
            
            <button 
                onClick={async (event) => {
                    event.preventDefault();
                    const updatedContact = {
                        name: name,
                        address: address,
                        phoneNumber: phoneNumber,
                        email: email,
                        contactType: contactType
                    }
                    if (edit === null)  
                        {fetchAPI("https://univ-contact-book.herokuapp.com/api/contacts", "POST", updatedContact)
                        .then(function(data) {
                            data.contact.comments = [];

                            const newContact = data.contact;
                            console.log(newContact)
                            addNewContact(newContact)
                            })
                        .then(
                            handleClose(),
                            setName(''), 
                            setAddress(''),
                            setPhoneNumber(''),
                            setEmail(''),
                            setContactType(''))
                        .catch(console.error)}
                    else
                     { 
                            fetchAPI(`https://univ-contact-book.herokuapp.com/api/contacts/${edit}`, "PATCH", updatedContact)
                            .then(updateContact(updatedContact))
                            .then(
                                handleClose(),
                                setName(''),
                                setAddress(''),
                                setPhoneNumber(''),
                                setEmail(''),
                                setContactType('')
                            ).catch(console.error)
                         
                        }
                        
                        setEdit(null)    
                    }
                }

                
            >Submit</button>
        </form>
    </div>
  );

  return (
    <div>
      <AddIcon onClick={handleOpen} fontSize="large" style={{ color: 'green' }}>
      </AddIcon>
      <Modal
        open={open}
        onClose={handleClose}
      >
        {body}
      </Modal>
    </div>
  );
}