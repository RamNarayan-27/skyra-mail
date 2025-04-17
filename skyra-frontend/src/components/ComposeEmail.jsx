import React from 'react';
import './ComposeEmail.css';

const sampleHtml = `
    <h1>Hello World</h1>
    <p>This is a <strong>paragraph</strong> with some <em>formatted</em> text.</p>
    <ul>
      <li>List item 1</li>
      <li>List item 2</li>
    </ul>
  `;

const ComposeEmail = ({ emailData }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement actual email sending logic
    console.log('Sending email:', emailData);
  };

  return (
    <div className="compose-email">
      <h1 className='compose-email-title'>Email</h1>
      <div className='email-preview' dangerouslySetInnerHTML={{ __html: sampleHtml }} />
      <button className='send-email-button'>Send</button>
    </div>
  );
};

export default ComposeEmail; 
