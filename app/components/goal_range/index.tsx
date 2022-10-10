import { formatMoney } from "~/utils/pages/format_money";

type Props = {
  value: number
  endValue: number
}
export const GoalRange = ({ value = 0, endValue }: Props) => {
  return (
    <div className="slidecontainer">
      <p>{formatMoney(0)}</p>
      <label htmlFor="myRange">{value}%</label>
      <input
        key="goals"
        type="range"
        min="0"
        max="100"
        value={value}
        className="slider"
        id="myRange"
      />
      <p>{formatMoney(endValue)}</p>
    </div>
  );
};
