import useCalculatorStore, { useCalculatorResults } from '@/utils/store/calculator'
import React from 'react'
import TableSimulate from './TableSimulate';
import { moneyFormat } from '@/utils/calc/interest';

export default function SimulateResults() {
  const { length, rateType, r, t, c } = useCalculatorStore();
  const { netValue } = useCalculatorResults()

  const period = length === 'monthly';
  const periodRate = rateType === 'monthly';

  return (
    <div className='p-8'>
        <p className='mb-2 text-center'>
          {`Investindo ${moneyFormat.format(Number(c))} mesalmente, durante ${t}
          ${period ? 'meses' : 'anos'}, 
          a uma taxa de ${r}% ao ${periodRate ? 'mês' : 'ano'}
          , o valor líquido ao final desse período será:`}
        </p>
        <p className='text-[28px] font-[700] text-center'>{`${moneyFormat.format(netValue)}`}</p>
        <div className='mt-8'>
          <h2 className='mb-4 text-center w-[100%] font-[600] text-[20px]'>Resultado da simulação</h2>
          <TableSimulate />
        </div>
      </div>
  )
}
