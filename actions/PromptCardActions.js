'use session'
import {authOptions} from '@/libs/authOptions'
export const handleLikeButton = async()=>{
    const session = await getServerSession(authOptions)
}