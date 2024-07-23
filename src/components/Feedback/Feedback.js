import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { firestore } from './firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Feedback = ({ isModalOpen, setIsModalOpen }) => {
  const [name, setName] = useState('Anonymous');
  const [suggestion, setSuggestion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(firestore, 'suggestions'), {
        name: name.trim(),
        topic: 'SimplyCharts',
        suggestion: suggestion.trim(),
        timestamp: serverTimestamp(),
        status: 'incomplete'
      });
      setName('Anonymous');
      setSuggestion('');
    } catch (error) {
      console.error('Error adding suggestion: ', error);
    }
  };
  const handleProjectClick = async () => {
    try {
      const docRef = await addDoc(collection(firestore, 'feedback'), {
        project: 'SimplyCharts',
        timestamp: serverTimestamp()
      });
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div className={`modal ${isModalOpen ? 'show' : ''}`} style={{ display: isModalOpen ? 'block' : 'none' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Feedback</h5>
         
            <button type="button" className="close" onClick={() => setIsModalOpen(false)}>
              <Icon icon="mdi:close" width="24" />
            </button>
          </div>
          <div className="modal-body">
             <button onClick={() => handleProjectClick()}>
            Signal for Improvement
          </button>
            <h2>Leave a Suggestion</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name (optional)"
                  style={{ color: 'black' }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="suggestion">Suggestion</label>
                <input
                  id="suggestion"
                  type="text"
                  name="suggestion"
                  value={suggestion}
                  onChange={(e) => setSuggestion(e.target.value)}
                  placeholder="Your suggestion"
                  required
                  style={{ color: 'black' }}
                />
              </div>
              <button type="submit" style={{ backgroundColor: 'blue', color: 'white' }}>
                Submit
              </button>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
