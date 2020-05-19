import React, { FC } from 'react';
import './Loading.css';

const Loading: FC = () => {
  return (
    <div className="loading-container">
      <div className="loading-dash loading-uno" />
      <div className="loading-dash loading-dos" />
      <div className="loading-dash loading-tres" />
      <div className="loading-dash loading-cuatro" />
    </div>
  );
};

export default Loading;
