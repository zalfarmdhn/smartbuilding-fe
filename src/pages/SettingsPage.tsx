import React, { useEffect, useState } from 'react';
import { getSettings, putSettings } from '../services/settings';

const SettingsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    id: 1,
    haos_url: '',
    haos_token: '',
    scheduler: 0
  });

  const fetchData = async () => {
    const response = await getSettings();
    setFormData(response);
  } 

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData)
    putSettings(formData.haos_url, formData.haos_token, formData.scheduler);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="haosUrl" className="block mb-2 text-sm font-medium text-gray-900">
            HAOS URL
          </label>
          <input
            type="text"
            id="haosUrl"
            name="haosUrl"
            value={formData.haos_url}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="http://your-haos-url"
            required
          />
        </div>

        <div>
          <label htmlFor="haosToken" className="block mb-2 text-sm font-medium text-gray-900">
            HAOS Token
          </label>
          <input
            type="text"
            id="haosToken"
            name="haosToken"
            value={formData.haos_token}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter your HAOS token"
            required
          />
        </div>

        <div>
          <label htmlFor="scheduler" className="block mb-2 text-sm font-medium text-gray-900">
            Schedule Time (dalam detik)
          </label>
          <input
            type="number"
            id="scheduler"
            name="scheduler"
            value={formData.scheduler}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="30"
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-primary-300 hover:bg-primary-400 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default SettingsPage;