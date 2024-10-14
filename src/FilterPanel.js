import React, { useEffect, useState } from 'react';
import './FilterPanel.css'

function FilterPanel({ userId, onFilterChange }) {
  const [filterValues, setFilterValues] = useState({
    Date: '',
    Region: '',
    Product_Type: '',
    Discount_Percent: '',
    Return_Rate: '',
    Customer_Satisfaction: '',
    Customer_Count: '',
  });

  useEffect(() => {
    // Load user configuration when the component mounts
    const loadUserConfig = async () => {
      const response = await fetch(`http://localhost:3000/load-configuration/${userId}`);
      if (response.ok) {
        const config = await response.json();
        // console.log(config)
        setFilterValues(config.filters || filterValues); // Set loaded filters
      }
    };

    loadUserConfig();
  }, [userId, filterValues]);

  const handleChange = (event) => {
    setFilterValues({
      ...filterValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    onFilterChange(filterValues);

    // Save user configuration
    try{
    let a = await fetch('http://localhost:3000/save-configuration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, filters: filterValues }),
    });
    console.log(a)
    let response = await a.json();
    console.log(response)
  }
  catch(error) {
    console.error('Error saving configuration:', error);
  }
  };

  return (
    <div className='filter-form'>
    <form onSubmit={handleSubmit}>
      {/* Filter input fields */}
      <div>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          name="Date"
          value={filterValues.Date || ''}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="region">Region:</label>
        <select name="Region" value={filterValues.Region || ''} onChange={handleChange}>
          <option value="">All</option>
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="East">East</option>
          <option value="West">West</option>
        </select>
      </div>
      <div>
        <label htmlFor="productType">Product Type:</label>
        <select name="Product_Type" value={filterValues.Product_Type || ''} onChange={handleChange}>
          <option value="">All</option>
          <option value="Food">Food</option>
          <option value="Clothing">Clothing</option>
          <option value="Electronics">Electronics</option>
          <option value="Furniture">Furniture</option>
        </select>
      </div>
      <div>
        <label htmlFor="discountPercent">Discount Percent:</label>
        <input
          type="number"
          name="Discount_Percent"
          value={filterValues.Discount_Percent || ''}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="returnRate">Return Rate:</label>
        <input
          type="number"
          name="Return_Rate"
          value={filterValues.Return_Rate || ''}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="customerSatisfaction">Customer Satisfaction:</label>
        <input
          type="number"
          name="Customer_Satisfaction"
          value={filterValues.Customer_Satisfaction || ''}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="customerCount">Customer Count:</label>
        <input
          type="number"
          name="Customer_Count"
          value={filterValues.Customer_Count || ''}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Apply Filters</button>
    </form>
    </div>
  );
}

export default FilterPanel;
