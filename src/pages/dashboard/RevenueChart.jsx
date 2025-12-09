import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: 1, sales: 82000, profit: 78000 },
  { day: 2, sales: 79000, profit: 74000 },
  { day: 3, sales: 85000, profit: 81000 },
  { day: 4, sales: 87000, profit: 86000 },
  { day: 5, sales: 90000, profit: 87000 },
  { day: 6, sales: 60000, profit: 58000 },
  { day: 7, sales: 50000, profit: 48000 },
  { day: 8, sales: 72000, profit: 69000 },
  { day: 9, sales: 66000, profit: 63000 },
  { day: 10, sales: 70000, profit: 67000 },
  { day: 11, sales: 78000, profit: 75000 },
  { day: 12, sales: 55000, profit: 50000 },
  { day: 13, sales: 62000, profit: 59000 },
  { day: 14, sales: 88000, profit: 85000 },
  { day: 15, sales: 95000, profit: 92000 },
  { day: 16, sales: 48000, profit: 45000 },
  { day: 17, sales: 92000, profit: 88000 },
  { day: 18, sales: 83000, profit: 79000 },
  { day: 19, sales: 98000, profit: 94000 },
  { day: 20, sales: 76000, profit: 72000 },
  { day: 21, sales: 87000, profit: 83000 },
  { day: 22, sales: 84000, profit: 80000 },
  { day: 23, sales: 0, profit: 0 },
  { day: 24, sales: 0, profit: 0 },
  { day: 25, sales: 0, profit: 0 },
  { day: 26, sales: 0, profit: 0 },
  { day: 27, sales: 0, profit: 0 },
  { day: 28, sales: 0, profit: 0 },
  { day: 29, sales: 0, profit: 0 },
  { day: 30, sales: 0, profit: 0 },
  { day: 31, sales: 0, profit: 0 },
];

export default function RevenueChart() {
  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-bold">Revenue Summary</h2>
        <select className="border rounded px-2 py-1 text-sm">
          <option>October</option>
        </select>
      </div>
      <div className="h-72 bg-white p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" label={{ value: "", position: "insideBottom", offset: -5 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#6366F1" name="Sales" strokeWidth={2} />
            <Line type="monotone" dataKey="profit" stroke="#F87171" name="Profit" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
