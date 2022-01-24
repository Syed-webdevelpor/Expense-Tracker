 import react , { createContext , useReducer, useState} from 'react';
import { Reducer}  from './AppReducer';
import axios  from 'axios'
const initialstate = {
    transactions : [
        
        ],
        error : null,
        loading : true
}
// Create context
export const GlobalContext = createContext(initialstate);

// Provider component
export const GlobalProvider = ({ children }) =>{
    const [state ,dispatch] = useReducer(Reducer ,initialstate)

    //Actions
    async function getTransactions(){
        try {
            const res = axios.get('api/v1/transaction')

            dispatch({
                type : 'GET_TRANSACTION',
                payload : res.data.data
            });
        } catch (err) {
            
            dispatch({
                type : 'TRANSACTION_ERROR',
                payload : err.response.data.error
            });
        }
    }
  async  function deleteTransaction(id){
      try {
          await axios.delete(`/api/v1/transaction/${id}`)
          dispatch({
            type :'DELETE_TRANSACTION',
            payload : id
        });
      } catch (err) {
        dispatch({
            type : 'TRANSACTION_ERROR',
            payload : err.response.data.error
        });
      }
       
    }
  async  function addTransaction(transaction){
     const config = {
         header:{
             'Content -type':'application/json'
         }
     }

     try {
         const res = await axios.post('/api/v1/transaction', transaction , config);

         dispatch({
            type :'ADD_TRANSACTION',
            payload : res.data.data
        });
     } catch (err) {
        dispatch({
            type : 'TRANSACTION_ERROR',
            payload : err.response.data.error
        });
     }
  
    }
    return <GlobalContext.Provider value={{
        transactions : state.transactions ,
        error : state.error,
        loading : state.loading,
        getTransactions,
        deleteTransaction,
        addTransaction
    }}>
        {children}
    </GlobalContext.Provider>
}