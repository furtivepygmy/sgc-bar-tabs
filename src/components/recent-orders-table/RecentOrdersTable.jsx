import React from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

const RecentOrdersTable = () => {
  return (
    <div className="recent-orders-table mt-3">
      <MDBTable small hover responsive striped fixed>
        <MDBTableHead color="peach-gradient" textWhite>
          <tr>
            <th>Name</th>
            <th>Total</th>
            <th>Time</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          <tr onClick={() => console.log('Do something')} className="pointer">
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
            <td>@twitter</td>
          </tr>
        </MDBTableBody>
      </MDBTable>
    </div>
  );
};

export default RecentOrdersTable;
