const IPFS= require('ipfs-api');
const ipfs= IPFS('ipfs.infura.io','5001',{protocol:'https'})

/*ipfs.id((error,result)=>{
    if(error)
       console.log("Error in connecting to IPfs\n please check your Internet Connection");
    else
    {
        console.log("Connected to IPFS node", result.id,result.agentVersion,result.protocolVersion);
    }
})*/

export default  ipfs;