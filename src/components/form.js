import React, {useState, useEffect} from "react";
import {Route, Link, Switch} from "react-router-dom";
import * as yup from "yup";
import axios from "axios";

const formSchema= yup.object().shape({
    name: yup.string().required("Name is Required").min(2, "Minimum Length 2 Characters"),
    size: yup.string(),
    sauce: yup.boolean().oneOf([true], "Please Select A Sauce"),
    pizzaToppings: yup.boolean().oneOf([true], "Please Select a Topping"),
    special: yup.string()
})



function Form(){
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [formState, setFormState] =useState({
        name: "",
        size: "",
        sauce: "",
        pizzaToppings: "",
        special: ""
    })

    const [errors, setErrors] = useState({
        name: "",
        size: "",
        sauce: "",
        pizzaToppings: "",
        special: ""
    })

    const [post, setPost] = useState([])

    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setButtonDisabled(!valid);
        })
    }, [formState])

    const formSubmit = e => {
        e.preventDefault();
        axios.post('https://reqres.in/api/users', formState)
        .then(res => {
            setPost(res.data);
            console.log("successful", post);
            setFormState({
                name: "",
                size: "",
                sauce: "",
                pizzaToppings: "",
                special: ""
            })
            .catch(err => console.log(err.response))
        })
    }
    const validateChange = e => {
        // Reach will allow us to "reach" into the schema and test only one part.
        yup
          .reach(formSchema, e.target.name)
          .validate(e.target.value)
          .then(valid => {
            setErrors({
              ...errors,
              [e.target.name]: ""
            });
          })
          .catch(err => {
            setErrors({
              ...errors,
              [e.target.name]: err.errors[0]
            });
          });
      };
      const inputChange = e => {
        e.persist();
        const newFormData = {
          ...formState,
          [e.target.name]:
            e.target.type === "checkbox" ? e.target.checked : e.target.value
        };
    
        validateChange(e);
        setFormState(newFormData);
      };
    
    return (
        <>
            <Link to="/pizza"></Link>
<form onSubmit="formSubmit">

    <label>Name: <input type="text" name="name" id="name" placeholder="Name" value={formState.name} onChange={inputChange}/></label>
<h2>Choice of Size</h2>
<p>Required</p>
    <label>
    <select id="size" name="size">
        <option value="personal">Personal</option>
        <option value="md">Medium</option>
        <option value="lg">Larger</option>
        <option value="xl">Extra Large</option> 
    </select>
    </label>

<h2>Choose Your Sauce</h2>
<p>Required</p>
    <label><input type="checkbox" id="original" name="sauce[]" value={formState.sauce[0]} onChange={inputChange}/>Original Red</label>
    <label><input type="checkbox" id="garlicranch" name="sauce[]" value={formState.sauce[1]} onChange={inputChange}/>Garlic Ranch</label>
    <label><input type="checkbox" id="bbqsauce" name="sauce[]" value={formState.sauce[2]} onChange={inputChange}/>Bar-B-Q Sauce</label>


            <fieldset>
                <legend><h2>Choose Your Toppings</h2></legend>
                <p>Choose Up To 8</p>
                <p>
                    <label><input type="checkbox" name="pizzaToppings" value="Pepperoni" />Pepperoni</label>
                    <label><input type="checkbox" name="pizzaToppings" value="Sausage" />Sausage</label>
                    <label><input type="checkbox" name="pizzaToppings" value="Canadian Bacon" />Canadian Bacon</label>
                    <label><input type="checkbox" name="pizzaToppings" value="Spicy Italian Sausage" />Spicy Italian Sausage</label>
                    <label><input type="checkbox" name="pizzaToppings" value="Grilled Chicken" />Grilled Chicken</label>
                    <label><input type="checkbox" name="pizzaToppings" value="Jalapenos" />Jalapenos</label>
                    <label><input type="checkbox" name="pizzaToppings" value="3 Cheese Blend" />3 Cheese Blend</label>
                    <label><input type="checkbox" name="pizzaToppings" value="Extra Cheese" />Extra Cheese</label>

                </p>
            </fieldset>


<h2>Special Instructions</h2>

            <label><input type="text" id="special" name="special" placeHolder="Anything Else You'd Like To Add?"/></label>
            <pre>{JSON.stringify(post, null, 2)}</pre>
      <button disabled={buttonDisabled}>Submit</button>
</form>


</>
    )
}

export default Form;
