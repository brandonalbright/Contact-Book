import React, { useEffect, useState } from  "react";
import ReactDOM from "react-dom";
import ContactModal from "./components/MODAL"
import Contacts from "./components/CONTACTS"
import fetchAPI from "./api/index"
import "./index.css"




function App() {
    const [contactList, setContactList] = useState([])
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [contactType, setContactType] = useState('');
    const [edit, setEdit]= useState(null)
    
    
    useEffect(() => {
        fetchAPI("https://univ-contact-book.herokuapp.com/api/contacts")
        .then(function (data) {
            const sortedArray = data.contacts.sort(function (a, b) {
                if (a.name < b.name) return -1;
                else if (a.name > b.name) return 1;
                return 0;
              });
            setContactList(sortedArray);
            
        })
        .catch(function (error) {
            console.error('error fetching contacts', error);
        })
    }, [])
    




    function addNewContact(newContact) {
        return setContactList([...contactList, newContact ])
      }

    function updateContact(updatedContact) {
        let index = contactList.findIndex((contact) => {
            return contact.id === edit
        })
        
        if (index > -1) {
            let contactListCopy = [...contactList]
            contactListCopy[index] = updatedContact
            setContactList(contactListCopy)
        }
    }

    return (
        <>
            <div className="title">
                <h1>My Contacts</h1>
                <ContactModal 
                    addNewContact={addNewContact}
                    open={open}
                    setOpen={setOpen}
                    name={name}
                    address={address}
                    phoneNumber={phoneNumber}
                    email={email}
                    contactType={contactType}
                    setName={setName}
                    setAddress={setAddress}
                    setPhoneNumber={setPhoneNumber}
                    setEmail={setEmail}
                    setContactType={setContactType}
                    edit={edit}
                    setEdit={setEdit}
                    updateContact={updateContact}
                    />
            </div>
            <Contacts 
                contactList={contactList}
                setContactList={setContactList}
                setOpen={setOpen}
                setName={setName}
                setAddress={setAddress}
                setPhoneNumber={setPhoneNumber}
                setEmail={setEmail}
                setContactType={setContactType}
                setEdit={setEdit}
                />
        </>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById(`app`)
);
