import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../components/AdminSidebar'
import api from '../../services/api'

export default function AdminPayments() {

  const [payments, setPayments] = useState([])

  useEffect(() => {
    fetchPayments()
  }, [])

  const fetchPayments = async () => {

    try {

      const response =
        await api.get(
          '/payments/status?status=SUCCESS'
        )

      setPayments(response.data)

    } catch (error) {

      console.error(error)

    }
  }

  return (
    <div className="flex min-h-screen bg-sky-950">

      <AdminSidebar />

      <main className="flex-1 p-8">

        <h1 className="font-heading text-3xl text-white mb-2">
          Payments
        </h1>

        <p className="text-white/40 mb-8">
          Total Payments : {payments.length}
        </p>

        <div className="card overflow-x-auto">

          <table className="w-full text-sm">

            <thead>

              <tr className="text-white/40 border-b border-white/10">

                <th className="text-left py-3">
                  Payment ID
                </th>

                <th className="text-left py-3">
                  Booking ID
                </th>

                <th className="text-left py-3">
                  Amount
                </th>

                <th className="text-left py-3">
                  Mode
                </th>

                <th className="text-left py-3">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {payments.map((payment) => (

                <tr
                  key={payment.id}
                  className="border-b border-white/5 text-white/70"
                >

                  <td className="py-3">
                    {payment.id}
                  </td>

                  <td className="py-3">
                    {payment.booking?.id}
                  </td>

                  <td className="py-3">
                    ₹{payment.amount?.toLocaleString()}
                  </td>

                  <td className="py-3">
                    {payment.paymentMode}
                  </td>

                  <td className="py-3">

                    <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                      {payment.status}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </main>

    </div>
  )
}