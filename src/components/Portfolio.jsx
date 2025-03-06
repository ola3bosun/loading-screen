import React from 'react';
import FlowingMenu from './Portfolio-edit';
import "./FlowingMenu.css";

const demoItems = [
  { link: '#', text: 'Eagle AI', image: 'https://picsum.photos/600/400?random=1' },
  { link: '#', text: 'Trade Engine Charts', image: 'https://picsum.photos/600/400?random=2' },
  { link: '#', text: 'Crowle', image: 'https://picsum.photos/600/400?random=3' },
  { link: '#', text: 'CCL', image: 'https://picsum.photos/600/400?random=4' }
];

const Portfolio = () => {
  return (
    <div style={{ height: '600px', position: 'relative' }}>
      <FlowingMenu items={demoItems} />
    </div>
  );
};

export default Portfolio;
