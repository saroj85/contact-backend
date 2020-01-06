import React from 'react';
import Contact from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <div className="row">
            <ContactForm />
            <Contact />
           
            </div>
        </div>
    )
}



export default Home;