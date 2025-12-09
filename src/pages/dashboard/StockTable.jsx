const data = [
  { id: 1, batchId: "ROF-01", name: "Prefilter RO Servic...", brand: "Kent", count: 300, price: "₹799.00" },
  { id: 2, batchId: "ROF-02", name: "Kent Grand Plus RO", brand: "Kent", count: 400, price: "₹799.00" },
  { id: 3, batchId: "ROF-03", name: "MG678", brand: "Kent", count: 500, price: "₹799.00" },
  { id: 4, batchId: "ROF-06", name: "Kent Grand Plus RO", brand: "Kent", count: 500, price: "₹799.00" },
];

export default function StockTable() {
  return (
    <div className="bg-white p-4 rounded shadow overflow-auto">
      <h2 className="text-lg font-bold mb-4">Stock Levels</h2>
      <table className="min-w-full text-sm text-left border border-[#CACACA]">
        <thead className="bg-[#F5F5F5] border-b border-[#CACACA]">
          <tr>
            <th className="p-2 border-t border-[#CACACA] ">Sr.No.</th>
            <th className="p-2 border-t border-[#CACACA]">Batch ID</th>
            <th className="p-2 border-t border-[#CACACA]">Product Name</th>
            <th className="p-2 border-t border-[#CACACA]">Brand</th>
            <th className="p-2 border-t border-[#CACACA]">Count</th>
            <th className="p-2 border-t border-[#CACACA]">Price</th>
            <th className="p-2 pl-2">Status</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-t border-[#CACACA]">
              <td className="p-2 border-b border-[#CACACA] pl-6 ">{item.id}</td>
              <td className="p-2 border-b border-[#CACACA]">{item.batchId}</td>
              <td className="p-2 border-b border-[#CACACA]">{item.name}</td>
              <td className="p-2 border-b border-[#CACACA]">{item.brand}</td>
              <td className="p-2 border-b border-[#CACACA]">{item.count}</td>
              <td className="p-2 border-b border-[#CACACA]">{item.price}</td>
              <td className="p-2 ">
                {item.count > 0 ? (
                  <span className="text-green-600 border border-green-600 text-xs px-2 py-1 rounded-full ">
                    IN STOCK
                  </span>
                ) : (
                  <span className="text-red-600 border border-red-600 text-xs px-2 py-1 rounded-full">
                    OUT OF STOCK
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
