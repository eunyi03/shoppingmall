import React from 'react';

const ColumnListCommunity = ({ children, isTitleColumn }) => {
  return <td className={`ListCommunity-column ${isTitleColumn ? 'title-column' : ''}`}>{children}</td>;
};

export default ColumnListCommunity;
