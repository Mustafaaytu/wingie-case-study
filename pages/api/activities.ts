import { NextApiRequest, NextApiResponse } from 'next'
import { activitiesMockData } from '@/mock/activities.mock'

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    res.status(200).json(activitiesMockData)
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}
