const jwt =require('jsonwebtoken');
const {promisify}=require('util')

module.exports={
    eAdmin:async function(req, res, next){
        const auth=req.headers.authorization;
        console.log(auth);
        if(!auth){
            return res.status(400).json({
                erro:true,
                mensagem: "Erro Necessario relizar para acessara pagina"
            })
        }
       const [token]= auth.split('  ');
       console.log(  "Token: "+ token);
       
       if(!token){
        return res.status(400).json({
            erro: true,
            mensagem:"Não foi possivel realizar o login"
        })
       }
       try {
        const decode= await promisify(jwt.verify)(token, "CHILENGUEJ29222739");
        req.userID=decode.bind;
        return next();
       } catch (error) {
        return res.status(400).json({
            erro: true,
            mensagem:"Não foi possivel realizar o login"
        })
       }
    }
}