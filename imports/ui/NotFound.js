import React from 'react';
import {Link} from 'react-router';
export default ()=>{
  return(
    <div className="boxed-view">
      <div className="boxed-view__box">
        <h1> This page is not found </h1>
        <p>We are unable to find the page.</p>
        <Link className="button button--link" to="/">HEAD HOME</Link>
      </div>
    </div>
  );
}
// export default class NotFound extends React.Component{
//
//     render(){
//       return <p> This page is not found </p>;
//     }
// }
