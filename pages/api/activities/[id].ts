import { NextApiRequest, NextApiResponse } from 'next'
import { activitiesMockData } from '@/mock/activities.mock'

export default (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
    method,
  } = req

  const activityId = parseInt(id as string, 10)

  switch (method) {
    case 'GET':
      const activity = activitiesMockData.find(
        (activity) => activity.id === activityId,
      )

      if (activity) {
        res.status(200).json(activity)
      } else {
        res.status(404).json({ message: 'Activity not found' })
      }
      break

    default:
      res.status(405).json({ message: 'Method Not Allowed' })
      break
  }
}
