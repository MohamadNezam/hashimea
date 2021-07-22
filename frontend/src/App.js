
import React,{Component} from 'react';
import './App.css';
import {Formik,Field, ErrorMessage} from "formik";
import * as Yup from "yup";
class  App extends Component  {
  onSubmit =(values)=>{
    console.log(values);
  }
  form=(props)=>{
    return <form onSubmit={props.handleSubmit}>
      <label>Phone</label>
      <br/>
       <Field name="Phone"  type="tel" 
       pattern="[0-9]{8}" />
       <ErrorMessage name="Phone"/>
            <br/>
       <label>Password</label>
       <br/>
       <Field name="Password" type="password"/>
       <br/>
       
       <button type="submit">login </button>       
    </form>
  }
  schema =()=>{
    const schema=Yup.object().shape({
      Phone: Yup.string().required()
    });
    return schema;
  }
  render(){
  return (
    <div className="App">
      <Formik 
      initialValues={{Phone:"9",Password:""}}
      onSubmit={this.onSubmit}
      render={this.form}
      validationSchema={this.schema()}
      />

    </div>
  );
  }
}

export default App;
