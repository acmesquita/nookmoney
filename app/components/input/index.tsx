type Props = React.HTMLProps<HTMLInputElement> & React.HTMLAttributes<HTMLInputElement> & {
  name: string
  id: string
  label: string
  errors?: string[]
}

export const Input = ({ name, id, label, errors, ...props }: Props) => (
  <div className="field" data-testid="input">
    <label htmlFor={name}>{label}</label>
    <input name={name} id={id} {...props} className={errors?.length ? 'error' : ''} />
    {errors && errors.map(error => (<span key={error} className="error" data-testid="input-error">{error}</span>))}
  </div>
)