import type { Bank } from '@prisma/client';
import React from 'react';
import { Button } from '~/components/button';
import { MainWithHeader } from "~/components/page_header";

type Props = {
  banks: Bank[]
}

export function UpdateAmount({ banks }: Props) {
  return (
    <MainWithHeader
      title="Update Amount"
      actions={[
        { to: '/banks', className: 'btn btn-secundary', title: 'Voltar' }
      ]}
    >
      <div className="card">
        <form action="update_amount" method='post' className='updateAmountForm'>
          <div className="fields">
            {banks.map((bank, index) => (
              <React.Fragment key={bank.id}>
                <input name={`banks[${index}].id`} hidden defaultValue={bank.id} />
                <div className="field">
                  <label htmlFor={`banks[${index}].amount`}>{bank.name}</label>
                  <input name={`banks[${index}].amount`} placeholder={String(bank.amount)} type="number" step="0.01" defaultValue={String(bank.amount)} />
                </div>
              </React.Fragment>
            ))}
          </div>
          <Button type='submit'>Save</Button>
        </form>
      </div>
    </MainWithHeader>
  )
}