import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';

import {
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    SET_ALERT,
    REMOVE_ALERT,
    ADD_CONTACT
} from '../type';





const ContactState = (props) => {
    const initialState = {
        contacts: [
            {
                id: 1,
                name: "saroj kumar",
                email: "send4saroij@gmail.com",
                phone: "1234567890",
                type: "personal"
            },
            {
                id: 2,
                name: "Sandeep kumar",
                email: "sandeep@gmail.com",
                phone: "4356789876",
                type: "personal"
            },
            {
                id: 3,
                name: "Raju kumar",
                email: "raju4@gmail.com",
                phone: "081380674787",
                type: "Professional"
            },
        ],
        current: null,
        filterd: null,
    };


    const [state, dispatch] = useReducer(ContactReducer, initialState);


    // ADD CONTACTS

    const addContact = contact => {
        contact.id = uuid.v4();
        dispatch({ type: ADD_CONTACT, payload: contact })
    }



    // DELETE_CONTACT

    const deleteContact = id => {
        dispatch({ type: DELETE_CONTACT, payload: id })
    }


    // SET CURRENT CONTACT 
    
    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact })
    }



    // CLEAR CURRENT CONTACT 
    
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT })
    }



    // UPDATE CONTACT 

    const updateContact = contact => {
        dispatch({ type: UPDATE_CONTACT, payload: contact })
    }



    // FILTER CONTACT 

    const filterContact = text => {
        dispatch({type: FILTER_CONTACTS, payload: text})
    }


    // CLEAR FILTER 


    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER })
    }



    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                filterd: state.filterd,
                current: state.current,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContact,
                clearFilter,
              
            }}>
            {props.children}
        </ContactContext.Provider>
    ) 
};




export default ContactState;