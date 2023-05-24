import { MainWithHeader } from "~/components/page_header";
import { formatMoney } from "~/utils/pages/format_money";

type Props = {
  resume: { [item: string]: Array<{ bank: string, amount: number }>}
}

export function TimelineReports({ resume }: Props) {
  return (
    <MainWithHeader title="Timeline">
      <ul className="timeline">
        {Object.entries(resume).map((item, index) => (
          <li key={item[0]}>
          <div className={`direction-${index % 2 === 0 ? 'r' : 'l'}`}>
            <div className="flag-wrapper">
              <span className="hexa"></span>
              <span className="flag">
                {formatMoney(item[1].map(i => Number(i.amount)).reduce((i, c) => (c + i), 0))}
              </span>
              <span className="time-wrapper"><span className="time">{item[0]}</span></span>
            </div>
            <div className="desc">
              {item[1].map(bank => (
                <p key={bank.bank} className="desc-item">
                  <div>{bank.bank}</div>
                  <div>{formatMoney(Number(bank.amount))}</div>
                </p>
              ))}
            </div>
          </div>
        </li>
        ))}
      </ul>
    </MainWithHeader>
  )
}