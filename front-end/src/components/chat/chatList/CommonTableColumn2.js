import React from 'react';

const CommonTableColumn2 = ({ children, isTitleColumn }) => {
  return <td className={`common-table-column2 ${isTitleColumn ? 'title-column' : ''}`}>{children}</td>;
};

export default CommonTableColumn2;
