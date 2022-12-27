/* eslint-disable */
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { spinnerLoading } from '../../actions/auth';

const  VerifyComponentAccess=(WrappedComponent)=> {
return (props) => {
    const [status,setStatus]= useState(false)
    useEffect(()=> {
        setTimeout(() => {
            setStatus(true)
          }, 2000)
    },[])
    
   /*      let status = false
        useEffect(()=> {
            try{
            spinnerLoading(status)
        }catch(err){
            console.log(err)
          }
          },[]) */
 

/*     return ( <>
        <div className="spinner"> </div>
    </> ); */

    if(status === true) 
         return <WrappedComponent {...props} />; 
       
    else {
        return <div className="spinner"> </div>;
    } 
   

    }
}

const mapStateToProps = state =>({
    spinnerActivated:state.loadingSpinner.spinnerActivated
})

export default VerifyComponentAccess;
    




