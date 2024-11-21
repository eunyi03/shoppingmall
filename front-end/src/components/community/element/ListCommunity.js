import React from 'react';
import './ElementCommunity.css';

const ListCommunity = (props) => {
  const { headersName, children } = props;

  return (
    <table className="ListCommunity">
      <thead>
        <tr>
          {headersName.map((item, index) => {
            return (
              <td className="ListCommunity-header-column" key={index}>
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

export default ListCommunity;
