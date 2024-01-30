import React from 'react'

export default function Alert(props) {
    

  return (
    <div style={{height: '50px'}}>
    {true && <div className={`alert alert-success alert-dismissible fade show`} role="alert">
       <strong> alert</strong>: {props.message}
    </div>}
    </div>
  )
}
