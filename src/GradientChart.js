import React from "react";
import apiGradient from "./apiGradient";

function generateColors(numColors) {
  const colors = [];
  const initialColor = { r: 200, g: 50, b: 50 }; // Màu bắt đầu

  for (let i = 0; i < numColors; i++) {
    const factor = i / (numColors - 1); // Tính tỷ lệ từ 0 đến 1
    const color = {
      r: Math.round(initialColor.r + factor * (255 - initialColor.r)),
      g: Math.round(initialColor.g + factor * (255 - initialColor.g)),
      b: Math.round(initialColor.b + factor * (255 - initialColor.b)),
    };
    colors.push(`rgb(${color.r},${color.g},${color.b})`);
  }

  return colors;
}

const isSorted = (arr) => {
  for (let i = 1; i < arr.length; i++) {
    // Chuyển đổi chuỗi màu thành giá trị số để so sánh
    const current = arr[i]
      .replace("rgb(", "")
      .replace(")", "")
      .split(",")
      .map(Number);
    const previous = arr[i - 1]
      .replace("rgb(", "")
      .replace(")", "")
      .split(",")
      .map(Number);

    // So sánh giá trị RGB
    if (
      current[0] < previous[0] ||
      (current[0] === previous[0] && current[1] < previous[1]) ||
      (current[0] === previous[0] &&
        current[1] === previous[1] &&
        current[2] < previous[2])
    ) {
      return false;
    }
  }
  return true;
};

let a = 0;

const GradientChart = React.memo(({ selectedSubstances }) => {
  if (selectedSubstances == null) {
  } else {
    for (let i = 0; i < selectedSubstances.length; i++) {
      let apiG = apiGradient[selectedSubstances[i]];

      // Tạo mảng để lưu trữ các giá trị màu
      let colors = generateColors(700);

      const numberOfColors = 700;

      const data = [...apiG];

      // Sắp xếp tăng dần
      apiG.sort(function (a, b) {
        return a - b;
      });

      let colorMap = {};

      // Sắp xếp mảng floats và lưu màu tương ứng vào colorMap
      for (let i = 0; i < numberOfColors; i++) {
        let floatValue = apiG[i];
        let color = colors[i];
        colorMap[floatValue] = color;
      }

      let rbg = [];

      for (let i = 0; i < numberOfColors; i++) {
        let f = data[i];

        rbg[i] = colorMap[f];
      }

      // Tạo một phần tử div chứa các ô màu
      let colorContainer = document.createElement("div");

      if (!isSorted(rbg)) {
        let label = document.createElement("h3");
        label.innerHTML = selectedSubstances[i];
        label.style.textAlign = "center";
        document.body.appendChild(label);

        colorContainer.style.display = "flex";
        colorContainer.style.border = "1px solid black"; // Màu viền đen 1px
        colorContainer.style.width = "fit-content"; // Độ rộng của thẻ cha
        colorContainer.style.margin = "20px 110px 0";

        // Hiển thị màu sắc trên màn hình
        rbg.forEach((color) => {
          // Tạo một phần tử div để hiển thị màu sắc
          let colorBlock = document.createElement("div");
          colorBlock.style.width = "1.8px"; // Độ rộng của mỗi ô màu
          colorBlock.style.height = "100px"; // Chiều cao của mỗi ô màu
          colorBlock.style.backgroundColor = color;

          // Thêm phần tử vào container
          colorContainer.appendChild(colorBlock);
        });
        colorContainer.style.marginBottom = "40px";
        // Thêm container vào body hoặc một phần tử khác trong DOM
        document.body.appendChild(colorContainer);
      }
    }
  }
});

export default GradientChart;
