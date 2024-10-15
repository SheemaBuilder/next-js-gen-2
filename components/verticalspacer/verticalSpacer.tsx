import React from 'react';
import classNames from 'classnames'; // Make sure this package is installed
import styles from './VerticalSpacer.module.css'; // Assuming you're using CSS modules
import { VerticalSpacerComponentProps } from './types'; // Import the appropriate type
import { SpacingSize } from './spacing-types'; // Import the SpacingSize type

// Define the interface for VerticalSpacerProps
interface VerticalSpacerProps extends VerticalSpacerComponentProps<'unset' | SpacingSize['value']> {
  readonly attributes?: Record<string, any>; // Ensure attributes is typed correctly
}

// Create the VerticalSpacer component
export const VerticalSpacer: React.FunctionComponent<VerticalSpacerProps> = ({
  size,
  attributes,
}) => {
  // Destructure className and other attributes
  const { className: builderClassNames, ...restOfAttributes } = attributes || {};

  return (
    <div
      className={classNames(
        styles.wrapper, // Apply styles
        builderClassNames // Include any class names from attributes
      )}
      {...restOfAttributes} // Spread the remaining attributes
      style={{
        '--size': size, // Use size as a CSS custom property
      } as React.CSSProperties} // Ensure the style object is typed as CSSProperties
    />
  );
};
