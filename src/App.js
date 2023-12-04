import React, { useState } from "react";
import { Upload, Button, message, Spin, Select, Table } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./App.css";
import { uploadFile } from "./uploadFile";
import khaosatImage from "./img/khaosat.png";
import AreaChart from "./AreaChart";
import Footer from "./Footer";
import RenderApiResult from "./RenderApiResult";
import "bootstrap/dist/css/bootstrap.min.css";
import data from "./data";
import api from "./api";
import GradientChart from "./GradientChart";

const { Option } = Select;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState(null);
  const [apiResult, setApiResult] = useState(null);
  const [array1, setArray1] = useState([]);
  const [array2, setArray2] = useState([]);
  const [selectedSubstances, setSelectedSubstances] = useState([]);

  const modelMapping = {
    DM: "DM",
    N: "N",
    NH4: "NH4",
    CaO: "CaO",
    MgO: "MgO",
    K2O: "K2O",
    P2O5: "P2O5",
  };

  const handleModelChange = (value) => {
    console.log("handleModelChange");
    setSelectedSubstances(value);
  };

  const beforeUpload = (file) => {
    console.log("beforeUpload");
    const isCSV = file.type === "text/csv" || file.name.endsWith(".csv");

    if (!isCSV) {
      message.error("Vui lòng tải file .csv!");
    } else {
      setSelectedFile(file);
      setSelectedFileName(file.name);
    }

    return isCSV;
  };

  const handleCSVUpload = (fileName) => {
    const array1 = data[fileName].array1;
    console.log("Array1 Data:", array1); // Log the data
    setArray1(array1);
  };

  const handleChange = async (info, event) => {
    console.log("handleChange");
    if (info.file.status === "uploading") {
      setLoading(true);
    }

    if (info.file.status === "done") {
      setLoading(false);
      message.success(`Tải tệp ${info.file.name} thành công.`);
    } else if (info.file.status === "error") {
      setLoading(false);
      message.error(`Tải tệp ${info.file.name} thất bại.`);
      event.stopPropagation();
    }
  };

  const customRequest = async ({ onSuccess, onError, file }) => {
    console.log("customRequest start");
    try {
      if (!selectedSubstances.length || !file) {
        throw new Error("Hãy chọn cả chất và tệp dữ liệu.");
      }

      const formData = new FormData();
      formData.append("file", file);

      const response = await uploadFile(formData, selectedSubstances);

      if (response.status === 200) {
        const apiResult = response.data;

        // Assuming you want to store the entire result in state
        setApiResult(apiResult);

        handleCSVUpload(file.name);

        onSuccess();
      } else {
        console.error("API Error:", response.data);
        throw new Error(`API Error: ${response.statusText}`);
      }
    } catch (error) {
      onError(error);
    }
  };

  return (
    <div className="App custom-container">
      <div className="custom-background" />
      <div className="custom-content">
        <h1>CSV File Upload</h1>

        <div className="custom-controls">
          <Select
            placeholder="Select substances"
            style={{ width: 200, marginLeft: 10, marginRight: 40 }}
            mode="multiple"
            onChange={handleModelChange}
            value={selectedSubstances}
          >
            {Object.keys(modelMapping).map((key) => (
              <Option key={key} value={key}>
                {modelMapping[key]}
              </Option>
            ))}
          </Select>

          <Upload
            beforeUpload={beforeUpload}
            customRequest={customRequest}
            onChange={handleChange}
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />} loading={loading}>
              Tải tệp CSV
            </Button>
          </Upload>
        </div>

        {loading && <Spin />}
      </div>
      <div className="custom-image-container">
        <h1 style={{ padding: "20px" }}>Ảnh khảo sát bước sóng các chất</h1>
        <img className="custom-image" src={khaosatImage} alt="Stylish Image" />
      </div>

      {array1.length > 0 && (
        <div className="custom-image-container">
          <h1 style={{ padding: "20px" }}>Plot phổ NIR</h1>
          <AreaChart array1={array1} />
        </div>
      )}
      <RenderApiResult apiResult={apiResult} />

      <h1 style={{ paddingTop: 60, textAlign: "center" }}>
        Hệ số tương quan của các bước sóng đối với nồng độ của các chất
      </h1>
      <GradientChart selectedSubstances={selectedSubstances} />
    </div>
  );
};

export default App;
