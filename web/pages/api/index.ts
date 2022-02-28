import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {

}

export const addURI = async (
    req: NextApiRequest,
    res: NextApiResponse<Data>
) => {
    res.status(200).json({ name: 'John Doe' })
}   