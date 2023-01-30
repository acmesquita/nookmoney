import { TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { formatMoney } from "~/utils/pages/format_money";

export const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${payload[0].name}`}</p>
        <p className="">Amount: {formatMoney(Number(payload[0].value || 0))}</p>
      </div>
    );
  }

  return null;
};