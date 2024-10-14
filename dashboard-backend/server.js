const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3002;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/yourDatabase')
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(bodyParser.json()); // To parse JSON bodies

// Define Mongoose schema for user configurations
const configurationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  filters: { type: Object, required: true },
  chartConfig: { type: Object, required: true },
});

const Configuration = mongoose.model('Configuration', configurationSchema);
console.log(Configuration)
// Define Mongoose schema for exported data
const exportedDataSchema = new mongoose.Schema({
  exportName: { type: String, required: true },
  data: { type: Array, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ExportedData = mongoose.model('ExportedData', exportedDataSchema);

// API endpoint to handle data submission
app.post('/submit', (req, res) => {
  console.log('Received filtered data:', req.body);
  res.json({ message: 'Data submitted successfully' });
});

// API endpoint to save user configuration
app.post('/save-configuration', async (req, res) => {
  try {
    const { userId, filters, chartConfig } = req.body;

    const existingConfig = await Configuration.findOne({ userId });
    if (existingConfig) {
      // Update existing configuration
      existingConfig.filters = filters;
      existingConfig.chartConfig = chartConfig;
      await existingConfig.save();
      res.json({ message: 'Configuration updated successfully' });
    } else {
      // Create a new configuration
      const configuration = new Configuration({ userId, filters, chartConfig });
      await configuration.save();
      res.json({ message: 'Configuration saved successfully' });
    }
  } catch (error) {
    console.error('Error saving configuration:', error);
    res.status(500).json({ error: 'Failed to save configuration' });
  }
});

// API endpoint to load user configuration
app.get('/load-configuration/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const configuration = await Configuration.findOne({ userId });

    if (configuration) {
      res.json(configuration);
    } else {
      res.status(404).json({ message: 'Configuration not found' });
    }
  } catch (error) {
    console.error('Error loading configuration:', error);
    res.status(500).json({ error: 'Failed to load configuration' });
  }
});

// API endpoint to handle data export
app.post('http://localhost:3000/export', async (req, res) => {
  const { exportName, data } = req.body;

  if (!exportName || !data) {
    return res.status(400).json({ error: 'Export name and data are required.' });
  }

  try {
    const exportedData = new ExportedData({ exportName, data });
    await exportedData.save();

    res.json({ message: 'Data exported successfully' });
  } catch (error) {
    console.error('Error exporting data:', error);
    res.status(500).json({ error: 'Failed to export data' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

const cors = require('cors');
app.use(cors()); // Enable CORS for all requests
