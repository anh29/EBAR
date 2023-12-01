import React, { useState } from "react";
import { Upload, Button, message, Spin, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./App.css";
import { uploadFile } from "./uploadFile";

const { Option } = Select;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const modelMapping = {
    0: "Class 1",
    1: "Class 2",
    2: "Class 3",
    3: "Class 4",
    4: "Class 5",
    5: "Class 6",
  };
  const handleModelChange = (value) => {
    setSelectedModel(value);
  };

  const beforeUpload = (file) => {
    const isCSV = file.type === "text/csv" || file.name.endsWith(".csv");

    if (!isCSV) {
      message.error("Please upload a valid CSV file.");
    }

    return isCSV;
  };

  const handleChange = async (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
    }

    if (info.file.status === "done") {
      setLoading(false);
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      setLoading(false);
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const customRequest = async ({ file, onSuccess, onError }) => {
    try {
      await uploadFile(file);
      onSuccess();
    } catch (error) {
      onError(error);
      console.error("Error uploading file:", error);
    }
  };

  const simulateModelRun = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success(`Class "${modelMapping[selectedModel]}" run successful.`);
    }, 2000);
  };

  return (
    <div className="App custom-container">
      <div className="custom-background" />
      <div className="custom-content">
        <h1>CSV File Upload</h1>

        <Upload
          beforeUpload={beforeUpload}
          customRequest={customRequest}
          onChange={handleChange}
          showUploadList={false}
        >
          <Button icon={<UploadOutlined />} loading={loading}>
            Upload CSV
          </Button>
        </Upload>

        <div className="custom-controls">
          <Select
            placeholder="Select a class"
            style={{ width: 200 }}
            onChange={handleModelChange}
          >
            {Object.keys(modelMapping).map((key) => (
              <Option key={key} value={key}>
                {modelMapping[key]}
              </Option>
            ))}
          </Select>

          <Button
            type="primary"
            style={{ marginLeft: "10px" }}
            onClick={simulateModelRun}
          >
            Run Model
          </Button>
        </div>

        {loading && <Spin />}
      </div>
    </div>
  );
};

export default App;
