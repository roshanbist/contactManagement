import mongoose from 'mongoose';

import app from './app';

const PORT = process.env.PORT as string;
const mongodb_url = process.env.MONGODB_URL as string;

mongoose
  .connect(mongodb_url, {
    dbName: 'contact-management',
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log('MongoDB connected');
      console.log(`Server running at port http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  });
