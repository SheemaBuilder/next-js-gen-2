import React from 'react';
import { Builder } from '@builder.io/react';

interface CustomComponentProps {
    content: {
      title: string;
      description: string;
    };
  }
// Define the custom component that accepts an object as a prop
const ObjectComponent: React.FC<CustomComponentProps> = ({ content }) => {
    const { title, description } = content; // Destructuring content from props
  
    return (
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    );
  };

export default ObjectComponent;