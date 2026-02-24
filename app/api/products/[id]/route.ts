import { Params } from 'next/dist/server/request/params'
import { NextRequest } from 'next/server'

import { connectToDb } from '@/app/api/db'

export async function GET(request: NextRequest, { params }: { params: Params }) {
  const { db } = await connectToDb()
  const { id } = await params
  const product = await db.collection('products').findOne({ id: parseInt(id as string) })

  if (!product) {
    return new Response(JSON.stringify({ message: 'Product not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  return new Response(JSON.stringify(product), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
}
