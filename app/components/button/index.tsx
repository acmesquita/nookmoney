/* eslint-disable react/display-name */
import { Link } from "@remix-run/react"
import type { SetStateAction} from "react";
import { forwardRef, useState } from "react";
import DatePicker from 'react-datepicker';

type Props = React.HTMLProps<HTMLButtonElement> & React.HTMLAttributes<HTMLButtonElement> & {
  type?: 'button' | 'submit',
  variant?: 'primary' | 'secundary'
}

type DateMonthProps = {
  date: string
  handleSubmit: (date: Date) => void
}

export const DateMonth = ({ date, handleSubmit  }: DateMonthProps) => {
  const [startDate, setStartDate] = useState(new Date(date));

  function handle(date: SetStateAction<Date>) {
    setStartDate(date)
    handleSubmit(new Date(date.toString()))
  }

  const Input = forwardRef(({ value, onClick }: { value?: string, onClick?: () => void}, ref) => (
    //@ts-ignore
    <Button variant="secundary" onClick={onClick} ref={ref} >
      {value}
    </Button>
  ));

  return (
    <DatePicker
      selected={startDate}
      onChange={handle}
      customInput={<Input data-testid="date-month"/>}
      dateFormat="MM/yyyy"
      showMonthYearPicker
      showFullMonthYearPicker
    />
  );
};

export const Button = ({ children, variant = 'primary', type = 'button', href, ...props }: Props) => {
  if (href) {
    return (
      <Link to={href} className={`btn btn-${variant}`} data-testid="button-link">
        {children}
      </Link>
    )
  }

  return (
    <button
      {...props}
      type={type}
      className={`btn btn-${variant}`}
      data-testid="button"
    >
      {children}
    </button>
  )
}