import React, { useState } from 'react';

const sizesList = ['Extra Small', 'Small', 'Medium', 'Large', 'Extra Large'];

const colorsList = [
  { name: 'Red', color: '#FF0000' },
  { name: 'Green', color: '#00FF00' },
  { name: 'Blue', color: '#0000FF' },
  { name: 'Yellow', color: '#FFFF00' },
  { name: 'Black', color: '#000000' },
  { name: 'White', color: '#FFFFFF' },
];

const Form = () => {
  const [productsData, setProductsData] = useState([]);
  const [newSizeData, setNewSizeData] = useState('');
  const [newColorData, setNewColorData] = useState('');
  const [newPriceData, setNewPriceData] = useState('');
  const [newInventoryData, setNewInventoryData] = useState('');
  const [sizeOptionsData, setSizeOptionsData] = useState(sizesList);
  const [colorOptionsData, setColorOptionsData] = useState(colorsList);
  const [groupByData, setGroupByData] = useState('size');

  const addProductData = () => {
    const newProductData = {
      size: newSizeData,
      color: newColorData,
      price: parseFloat(newPriceData),
      inventory: parseInt(newInventoryData),
    };
    setProductsData([...productsData, newProductData]);
  };

  const addSizeOptionData = () => {
    setSizeOptionsData([...sizeOptionsData, newSizeData]);
    setNewSizeData('');
  };

  const addColorOptionData = () => {
    setColorOptionsData([...colorOptionsData, { name: newColorData, color: newColorData }]);
    setNewColorData('');
  };

  const groupedProductsData = productsData.reduce((acc, product) => {
    const key = product[groupByData];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(product);
    return acc;
  }, {});

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Inventory Form</h1>
      <div className="mb-4">
        <label className="block">Size</label>
        <select
          value={newSizeData}
          onChange={(e) => setNewSizeData(e.target.value)}
          className="border p-2 mb-2"
        >
          {sizeOptionsData.map((size, idx) => (
            <option key={idx} value={size}>
              {size}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={newSizeData}
          onChange={(e) => setNewSizeData(e.target.value)}
          placeholder="Add new size"
          className="border p-2 mb-2"
        />
        <button onClick={addSizeOptionData} className="bg-blue-500 text-white p-2">
          Add Size
        </button>
      </div>

      <div className="mb-4">
        <label className="block">Color</label>
        <select
          value={newColorData}
          onChange={(e) => setNewColorData(e.target.value)}
          className="border p-2 mb-2"
        >
          {colorOptionsData.map((color, idx) => (
            <option key={idx} value={color.name} style={{ backgroundColor: color.color, color: color.name === 'Black' ? '#FFFFFF' : '#000000' }}>
              {color.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={newColorData}
          onChange={(e) => setNewColorData(e.target.value)}
          placeholder="Add new color"
          className="border p-2 mb-2"
        />
        <button onClick={addColorOptionData} className="bg-blue-500 text-white p-2">
          Add Color
        </button>
      </div>

      <div className="mb-4">
        <label className="block">Price</label>
        <input
          type="number"
          value={newPriceData}
          onChange={(e) => setNewPriceData(e.target.value)}
          className="border p-2"
        />
      </div>

      <div className="mb-4">
        <label className="block">Inventory</label>
        <input
          type="number"
          value={newInventoryData}
          onChange={(e) => setNewInventoryData(e.target.value)}
          className="border p-2"
        />
      </div>

      <button onClick={addProductData} className="bg-green-600 text-white p-2 border-l-emerald-700">
        Add Product
      </button>

      <div className="mt-4">
        <label className="block">Group By</label>
        <select
          value={groupByData}
          onChange={(e) => setGroupByData(e.target.value)}
          className="border p-2"
        >
          <option value="size">Size</option>
          <option value="color">Color</option>
        </select>
      </div>

      <div className="mt-4">
        <h2 className="text-xl mb-4">Products</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Size</th>
              <th className="border border-gray-300 p-2">Color</th>
              <th className="border border-gray-300 p-2">Price</th>
              <th className="border border-gray-300 p-2">Inventory</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(groupedProductsData).map((key) => (
              <React.Fragment key={key}>
                <tr>
                  <td colSpan="4" className="bg-gray-200 p-2">
                    {groupByData}: {key}
                  </td>
                </tr>
                {groupedProductsData[key].map((product, idx) => (
                  <tr key={idx}>
                    <td className="border border-gray-300 p-2">{product.size}</td>
                    <td className="border border-gray-300 p-2">{product.color}</td>
                    <td className="border border-gray-300 p-2">{product.price}</td>
                    <td className="border border-gray-300 p-2">{product.inventory}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Form;
