export const getProducts=async(req,res)=>{
    res.json({
        success:true,
        message:"Products are fetched successfully"
    })
}
export const getProductById=async(req,res)=>{
    res.json({
        success:true,
        message:"Product is fetched successfully"
    })
}