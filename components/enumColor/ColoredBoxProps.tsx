
import React from 'react';


interface ColoredBoxProps {
  color: ColorEnum;
}
/*
enum ColorEnum [
  { id: 1, name: "Product 1" },
  { id: 2, name: "Product 2" },
  { id: 3, name: "Product 3" },
  { id: 4, name: "Product 4" },
];*/

enum ColorEnum {
    Red = 'red',
    Blue = 'blue',
    Green = 'green',
  }
const ColoredBox= React.FC<ColoredBoxProps> = ({ color }) => {
  const boxStyle = {
    backgroundColor: color,
    width: '100px',
    height: '100px',
  };

  return <div style={boxStyle}></div>;
};


export default ColoredBox;
