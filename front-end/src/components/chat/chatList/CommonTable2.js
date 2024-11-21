import React from 'react';
// import './CommonTable2.css';

const CommonTable2 = (props) => {
  const { headersName, children } = props;

  return (
    <table className="common-table2">
      <thead>
        <tr>
          {headersName.map((item, index) => {
            return (
              <td className="common-table-header-column2" key={index}>
                {item}
              </td>
            );
          })}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default CommonTable2;
