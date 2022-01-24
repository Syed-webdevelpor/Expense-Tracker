const Tranaction = require ('../models/Transaction')


exports.getTransactions = async (req, res, next) =>{
 try {
     const transactions = await Tranaction.find();

     return res.status(200).json({
         success : true,
         count : transactions.length,
         data : transactions
     })
 } catch (err) {
     return res.status(500).json({
         success: false,
         error : " Server Error"
     })
 }
}

exports.addTransaction = async (req, res, next) =>{
    const { text, amount } = req.body;
try {
    
    const transaction = await Tranaction.create(req.body);
    return res.status(201).json({
        success : true,
        data : transaction
    })
} catch (err) {
if(err.name === 'ValidationError'){
    const messages = Object.values(err.errors).map(val => val.message);

    return res.status(400).json({
        success: false,
        error : messages
    })
}
else{
    return res.status(500).json({
        success: false,
        error : " Server Error"
    })
}
      }
}

exports.deleteTransaction = async (req, res, next) =>{
   try {
       const transaction = await Tranaction.findById(req.params.id);

       if (!transaction) {
           return res.status(404).json({
               success : false,
               error : "No transactin Found"
           })
        }
           await transaction.remove(); 
           return res.status(200).json({
            success : true,
            data : {}
        })
       
   } catch (err) {
    return res.status(500).json({
        success: false,
        error : " Server Error"
    })
   }
}