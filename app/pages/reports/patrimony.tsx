import { Bank } from "@prisma/client";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { MainWithHeader } from "~/components/page_header";
import { CustomTooltip } from "~/components/tooltip";
import { formatMoney } from "~/utils/pages/format_money";

interface Params {
  banks: Bank[]
}

export function PatrimonyReports({ banks }: Params) {

  const data = banks.map(bank => ({ name: bank.name, value: Number(bank.amount) }))
  const totalAmount = banks.map(bank => Number(bank.amount)).reduce((acumulate, value) => acumulate + value, 0)

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };



  return (
    <MainWithHeader title="Patrimony">
      <div className="flex">
        <PieChart width={500} height={500}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
        <table>
          <thead>
            <tr>
              <th>Bank</th>
              <th>Amount</th>
              <th>Percent</th>
            </tr>
          </thead>
          <tbody>
            {banks?.map((bank, index) => (
              <tr key={index}>
                <td>{bank.name}</td>
                <td>{formatMoney(Number(bank.amount))}</td>
                <td>{Math.round((Number(bank.amount) / totalAmount) * 100)}%</td>
              </tr>
            ))}
            <tr>
              <td><strong>Total</strong></td>
              <td><strong>{formatMoney(totalAmount)}</strong></td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </MainWithHeader>
  )
}