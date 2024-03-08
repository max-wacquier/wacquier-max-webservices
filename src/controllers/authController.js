import authService  from '#src/services/authService'
import usersService from '#src/services/usersService'
import jwt from 'jsonwebtoken'
const secretKey = 'secret_key'

const signJwt = ({payload, expiresIn}) => {
    return jwt.sign(payload, secretKey, {expiresIn})
}
    
const verifyJwt = (payload) => {
    return jwt.verify(payload, secretKey)
}

const exposeController = {

    login: async (req, res)=>{
        // const {body} = req
        // Toujours le meme probleme avec le body de ma requete
        const body = {
            email: "pepito.leroidugateau@gmail.com",
            password: "pepito"
        }
        const user = await usersService.findOneUserByEmail(body)
        
        if(!user) return res.sendStatus(401)
        const comparePwd = await authService.comparePassword({password:body.password,storedPassword:user.password})
        const tokenPayload = {
            lastName:user.lastName,
            firstName:user.firstName,
            email:user.email,
            roles:user.roles
        }
        if(comparePwd){ 
            const token = signJwt({payload:tokenPayload, expiresIn:'5min'}) 
            const refreshToken = signJwt({payload:tokenPayload, expiresIn:'7d'}) 
            const accessToken = {access_token:token, token_type:'Bearer'}
            const updateRefresh = await usersService.updateUserToken({userId:user._id, refreshToken})
            return res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' }).json(accessToken) 
        }
        return res.sendStatus(401)
    },
    refreshToken: async(req, res) => {
        const {cookies} = req
        if (!cookies?.refreshToken) return res.sendStatus(401)
        const refreshToken = cookies.refreshToken
        res.clearCookie('refreshToken', {httpOnly:true, sameSite:'None', secure:true})
        const foundUser = await usersService.findUserByRefreshToken({refreshToken})
        if(!foundUser) return res.sendStatus(403)
        try {
            const decoded = verifyJwt(refreshToken)
            const tokenPayload = {
                lastName:foundUser.lastName,
                firstName:foundUser.firstName,
                email:foundUser.email,
                roles:foundUser.roles
            }
            if(decoded.email !== foundUser.email) return res.sendStatus(403)
            const accessToken = signJwt({payload:tokenPayload, expiresIn:'1d'}) 
            return res.json({accessToken, token_type:'Bearer'})
        } catch (error) {
            console.log(error)
            return res.sendStatus(401)
        }
    }


}

export default exposeController