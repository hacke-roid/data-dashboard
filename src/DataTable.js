import React from 'react';
import PropTypes from 'prop-types';
import './DataTable.css'

function DataTable({ data }) {
  return (
    <div className='table-data'>
    <table border="2">
      <thead>
        <tr>
          <th>Date</th>
          <th>Sales</th>
          <th>Profit</th>
          <th>Customer Count</th>
          <th>Region</th>
          <th>Product Type</th>
          <th>Discount Percent</th>
          <th>Return Rate</th>
          <th>Customer Satisfaction</th>
        </tr>
      </thead>
      <tbody>
        {data && Array.isArray(data) && data.length > 0 ? (
          data.map((row, index) => (
            <tr key={index}>
              <td>{row.Date || 'N/A'}</td>
              <td>{row.Sales || 'N/A'}</td>
              <td>{row.Profit || 'N/A'}</td>
              <td>{row.Customer_Count || 'N/A'}</td>
              <td>{row.Region || 'N/A'}</td>
              <td>{row.Product_Type || 'N/A'}</td>
              <td>{row.Discount_Percent || 'N/A'}</td>
              <td>{row.Return_Rate || 'N/A'}</td>
              <td>{row.Customer_Satisfaction || 'N/A'}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="9">No data to display</td>
          </tr>
        )}
      </tbody>
    </table>
    </div>
  );
}

DataTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DataTable;
