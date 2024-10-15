/* eslint-disable react/no-deprecated */
import React from 'react';
import ReactDOM from 'react-dom';

const BlogPage: React.FC = () => {
  return (
    <div>
      <h1>I am a blog page</h1>
    </div>
  );
};

// Rendering the component to the DOM
ReactDOM.render(<BlogPage />, document.getElementById('root'));
