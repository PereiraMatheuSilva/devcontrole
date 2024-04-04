"use client"

import { useContext } from 'react';
import { CustomerProps } from '@/utils/customer.type';
import { TicketProps } from '@/utils/ticket.types';
import { FiCheckSquare, FiFile  } from 'react-icons/fi';
import { api } from '@/app/lib/api';
import { useRouter } from 'next/navigation';
import { ModalContext } from '@/providers/modal';
 
interface TicketsItemProps{
  ticket: TicketProps;
  customer: CustomerProps | null;
}

export function TicketItem({customer, ticket}:TicketsItemProps){
  const { handleModalVisible, setDetailTickt } = useContext(ModalContext);
  const router = useRouter();
  
  async function handleChangeStatus(){
    try {
      const response = await api.patch("/api/ticket", {
        id: ticket.id,
      })

      router.refresh();
      

    } catch (err) {
      console.log(err)
    }
  }


  function handleOpenModal(){
    handleModalVisible();
    setDetailTickt({
      customer: customer,
      ticket: ticket,
    })
  }


  return(
    <>
      <tr className='border-b-2 border-b-slate-200 h-16 last:border-b-0
         hover:bg-gray-200 duration-300
      '>
        <td className='text-left pl-1'>
          {customer?.name}
        </td>
        <td className='text-left'>
          {ticket.created_at?.toLocaleDateString('pt-br')}
        </td>
        <td className='text-left'>
          <span className='
          bg-green-500 
          px-2 
          py-1 
          rounded'>
            {ticket.status}
          </span>
        </td>
        <td className='text-left'>
          <button className='mr-3' onClick={handleChangeStatus}>
            <FiCheckSquare size={24} color='#131313'/>
          </button>

          <button onClick={handleOpenModal}>
            <FiFile size={24} color='#3b82f6'/>
          </button>
        </td>
      </tr>
    </>
  )
}