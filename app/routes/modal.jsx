
// import React from 'react';
// //import '../../node_modules/jquery/dist/jquery.min.js'

// export default class Modal extends React.Component {
//   // constructor(props) {
//   //   super(props);
//   // }

//   render() {
//     // Render nothing if the "show" prop is false
//     if (!this.props.show) {
//       return null;
//     }

//     // The gray background
//     const backdropStyle = {
//       position: 'fixed',
//       top: 0,
//       bottom: 0,
//       left: 0,
//       right: 0,
//       backgroundColor: 'rgba(0,0,0,0.3)',
//       padding: 50,
//       zIndex: 10
//     };

//     // // The modal "window"
//     // const modalStyle = {

//     //   width: '60%',
//     //   height: '80%',
//     // };

//     // const titleStyle = {

//     //   font: "bold"
//     // };

//     const scrollStyle = {
//       overflowX: 'hidden',
//       overflowY: 'scroll',
//     }

//     const closeButtonStyle = {
//       align: 'pull-right',
//       float: 'right',
//       cursor: 'pointer'
//     };

//     return (
//       <div className="backdrop" style={backdropStyle}  >
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h4 style={{ marginTop: '5px', marginBottom: '5px' }}>{this.props.title}</h4>    
//           <button type="button" className="close" aria-label="Close" onClick={this.props.onClose}
//                 style={closeButtonStyle}>
               
//                 <span aria-hidden="true">&times;</span></button>
                
//           </div>
//             <div className="modal-body" style={{height: '535px',scrollStyle}}>
//               {this.props.children}
//             </div>
//             {/* <div className="modal-footer">

//             </div> */}
//           </div>
//         </div>
//       </div>
//     );


//   }
// }