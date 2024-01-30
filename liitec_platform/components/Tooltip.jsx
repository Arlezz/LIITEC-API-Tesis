// Tooltip.js
import React, { useState, useEffect } from 'react';

const Tooltip = ({ content, isVisible, position, children }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(isVisible);

    // Oculta el tooltip después de un tiempo (por ejemplo, 2 segundos)
    const timeout = setTimeout(() => {
      setVisible(false);
    }, 2000);

    // Limpia el timeout al desmontar el componente
    return () => clearTimeout(timeout);
  }, [isVisible]);

  const tooltipStyles = {
    position: 'absolute',
    left: position === 'right' ? '100%' : 'auto',
    right: position === 'left' ? '100%' : 'auto',
    top: '50%',
    transform: 'translateY(-50%)',
    padding: '0.5rem',
    background: '#333',
    color: '#fff',
    borderRadius: '4px',
    whiteSpace: 'nowrap',
    zIndex: '999',
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {children}
      {visible && <div style={tooltipStyles}>{content}</div>}
    </div>
  );
};

export default Tooltip;
