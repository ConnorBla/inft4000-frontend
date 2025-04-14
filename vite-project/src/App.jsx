import React from 'react';
import TicketForm from './components/TicketForm';
import './styles/App.css'; // Assuming you have some global styles

const App = () => {
  return (
    <div>
      <h1>Ticket Purchase</h1>
      <TicketForm />
    </div>
  );
};

export default App;