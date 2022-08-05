import React from 'react';

function TableRow(item) {
    console.log(item)
    return (
      <tr>
        <td>{item.id}</td>
        <td><img src={item.avatar_url} height="130px" width={"100px"} /></td>
        <td>{item.login}</td>
        <td>{item.url}</td>
        <td>{item.type}</td>
      </tr>
    )
  }

  export default TableRow;