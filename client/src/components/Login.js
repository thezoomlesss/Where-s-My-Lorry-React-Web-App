import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Lock from "@material-ui/icons/Lock";
import FormControl from '@material-ui/core/FormControl';
// import Login_bg from './../imports/images/login_bg_blur.png'; 

// var state = {
//   works: '',
//   pass: ''
// };
// const styles = theme => ({
//   margin: {
//     margin: theme.spacing.unit
//   },
// });
// var bg = {
//     // backgroundImage: `url(${Login_bg})`,
//     // backgroundSize: 'cover', 
//     // backgroundRepeat: 'no-repeat',
//     // backgroundPosition: 'center center'
//     background: '#000046',  /* fallback for old browsers */
//     background: '-webkit-linear-gradient(to right, #1CB5E0, #000046)',  /* Chrome 10-25, Safari 5.1-6 */
//     background: 'linear-gradient(to right, #1CB5E0, #000046)' /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */


// };
// var grid_bg = {
//     background: 'rgb(255, 255, 255, .5)',
//     padding: '25px',
//     marginTop: '8%'
// };
// function formSubmit(e) {
//   e.preventDefault();
//   console.log('The form was submitted.');
// }
// function handleChange2( e){
//   console.log(e.target.value)
//   console.log(e.target.name)
// }

// function InputWithIcon(props) {
//   const { classes } = props;

//   return (
//     <div className= 'test' style={bg}>



//         <Grid
//   container
//   spacing={0}
//   direction="column"
//   alignItems="center"

//   style={{ minHeight: '100vh' }}
// >

//   <Grid item xs={3} style={grid_bg}>


// <FormControl>
//   <div className={classes.margin }>
//             <Grid container spacing={8} alignItems="flex-end">
//             <Grid item>
//                 <AccountCircle />
//             </Grid>
//             <Grid item>
//                 <TextField 
//                   name="email"
//                   onChange={handleChange2} 
//                   id="input-with-icon-grid" 
//                   label="email" />
//             </Grid>
//             </Grid>
//         </div>
//       <div className={classes.margin}>
//         <Grid container spacing={8} alignItems="flex-end">
//           <Grid item>
//             <Lock />
//           </Grid>
//           <Grid item>
//             <TextField 
//               name="pass"
//               onChange={handleChange2}
//               type="password"
//               id="input-with-icon-grid"
//               label="password"
//             />
//           </Grid>
//         </Grid>
//       </div>
//       <Button variant="contained" color="primary" onClick={formSubmit}>
//             Login
//         </Button>




//     </FormControl>

//   </Grid>   

// </Grid> 
//     </div>
//   );
// }

// InputWithIcon.propTypes = {
//   classes: PropTypes.object.isRequired
// };

// export default withStyles(styles)(InputWithIcon);


const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  },
});

const bg = {
  background: '#000046',  /* fallback for old browsers */
  background: '-webkit-linear-gradient(to right, #1CB5E0, #000046)',  /* Chrome 10-25, Safari 5.1-6 */
  background: 'linear-gradient(to right, #1CB5E0, #000046)' /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
};
const grid_bg = {
  background: 'rgb(255, 255, 255, .5)',
  padding: '25px',
  marginTop: '8%'
};
// function handleChange2(e){
//   if(e.target.name == this.email){
//     this.email = e.target.value;
//   }else{
//     this.pass = e.target.value;
//   }
//   console.log("Email is: " + this.state.email);
//   console.log("Pass is: " + this.state.pass);

// }
export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.handleChange2 = this.handleChange2.bind(this);
    // Define the initial state:
    this.state = {
      email: '',
      pass: '',
      companyID: ''
    };
  }



  handleChange2 = name => event => {
    if (name == 'email') {
      var emailVal = event.target.value;
      this.setState({
        ...this.state.email = emailVal
      });
      console.log(this.state.email);//...this.state.email);
    } else {
      this.setState({
        ...this.state.pass = event.target.value
      });
      console.log(this.state.pass);
    }
  };

  submitForm = () => event =>{
    // var url = "localhost:3001/checkUser?email=test@test.com&pass=password"
    fetch('/checkUser??email=test@test.com&pass=password')
        .then(res=>res)
        .then(companyID=> this.setState({companyID}));
    // window.alert("email:"+ this.state.email + "  password: "+ this.state.pass);
  };

  render() {
    return (
      <div style={bg}>
        <Grid container spacing={0} direction="column" alignItems="center" style={{ minHeight: '100vh' }}>
          <Grid item xs={3} style={grid_bg}>
            <FormControl>
              <div >
                <Grid container spacing={8} alignItems="flex-end">
                  <Grid item>
                    <AccountCircle />
                  </Grid>
                  <Grid item>
                    <TextField
                      onChange={this.handleChange2('email')}
                      name="email"
                      id="input-with-icon-grid"
                      label="email" />
                  </Grid>
                </Grid>
              </div>
              <div >
                <Grid container spacing={8} alignItems="flex-end">
                  <Grid item>
                    <Lock />
                  </Grid>
                  <Grid item>
                    <TextField
                      onChange={this.handleChange2('pass')}
                      name="pass"
                      type="password"
                      id="input-with-icon-grid"
                      label="password"
                    />
                  </Grid>
                </Grid>
              </div>
              <Button onClick={this.submitForm()} variant="contained" color="primary">
                Login
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </div>
    );
  }
}

