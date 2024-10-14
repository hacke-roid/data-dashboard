import React, { useState, useEffect } from "react";
import UploadCSV from "./UploadCSV";
import DataTable from "./DataTable";
import ChartContainer from "./ChartContainer";
import FilterPanel from "./FilterPanel";
import ExportForm from "./ExportForm"; // Import the ExportForm
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [chartConfig, setChartConfig] = useState({
    type: "bar",
    xAxisLabel: "Sales",
    yAxisLabel: "Profit",
  });
  const [filters, setFilters] = useState({});
  const userId = "user123"; // Replace with a dynamic user ID based on your authentication logic

  useEffect(() => {
    // Fetch saved filters and chart configuration from backend
    const loadUserConfig = async () => {
      const response = await fetch(
        `http://localhost:3000/load-configuration/${userId}`
      );
      if (response.ok) {
        const config = await response.json();
        setFilters(config.filters || {});
        setChartConfig(config.chartConfig || chartConfig);
      }
    };

    loadUserConfig();
  }, [userId]);

  const handleFileUpload = (csvData) => {
    setData(csvData);
    setFilteredData(csvData);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    const filtered = data.filter((row) => {
      return Object.entries(newFilters).every(([key, value]) => {
        if (value === "") {
          return true; // Include this row if the filter value is empty
        }
        return row[key] === value; // Filter logic
      });
    });
    setFilteredData(filtered);
  };

  return (
    <div className="App">
    <div className="header-container">
      <h1>Data Dashboard</h1>
      </div>
      <div className="Upload-csv-container">
        <UploadCSV onFileUpload={handleFileUpload} />
      </div>
      <div className="data-table">
        <DataTable data={filteredData} />
      </div>
      <div className="filter-panel-container">
        <FilterPanel userId={userId} onFilterChange={handleFilterChange} />
      </div>
      <div className="filter-object">
        <h2>Active Filters</h2>
        <pre>{JSON.stringify(filters, null, 2)}</pre> 
      </div>
     
      <ExportForm filteredData={filteredData} /> {/* Add ExportForm here */}
      <ChartContainer data={filteredData} chartConfig={chartConfig} />
    </div>
  );
}

export default App;
