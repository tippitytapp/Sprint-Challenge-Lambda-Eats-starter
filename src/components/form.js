import React, {useState, useEffect} from "react";
import {Route, Link, Switch} from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import "./form.css"

const formSchema= yup.object().shape({
    name: yup.string().required("Name is Required").min(2, "Minimum Length 2 Characters"),
    size: yup.string(),
    original: yup.string(),
    garlicranch: yup.string(),
    bbqsauce: yup.string(),
    pepperoni: yup.string(),
    sausage: yup.string(),
    canadianbacon: yup.string(),
    italianSausage: yup.string(),
    grilledChicken: yup.string(),
    jalapenos: yup.string(),
    cheeseblend: yup.string(),
    extracheese: yup.string(),
    special: yup.string()
})



function Form(){
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [formState, setFormState] =useState({
        name: "",
        size: "",
        original: "",
        garlicranch: "",
        bbqsauce: "",
        pepperoni: "",
        sausage: "",
        canadianbacon: "",
        italianSausage: "",
        grilledChicken: "",
        jalapenos: "",
        cheeseblend: "",
        extracheese: "",
        special: ""
    })

    const [errors, setErrors] = useState({
        name: "",
        size: "",
        original: "",
        garlicranch: "",
        bbqsauce: "",
        pepperoni: "",
        sausage: "",
        canadianbacon: "",
        italianSausage: "",
        grilledChicken: "",
        jalapenos: "",
        cheeseblend: "",
        extracheese: "",
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
            console.log("successful", post)

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
<form onSubmit={formSubmit}>
    <div className="name">
        <div>
        <label htmlFor="name">Name:    </label> <p>Required</p><br/>
        </div>
            <input type="text" name="name" id="name" placeholder="Name" value={formState.name} onChange={inputChange}/>
            {errors.name.length > 0 ? (<p data-cy="nameError" className='error'>{errors.name}</p>) : null}
    
        </div>
            <h2>Choice of Size</h2>
            <p>Required</p>
        <label>
            <select id="size" name="size">
                <option value="personal">Personal</option>
                <option value="md">Medium</option>
                <option value="lg">Larger</option>
                <option value="xl">Extra Large</option> 
            </select>
            {errors.size.length > 0 ? (<p data-cy="size" className='error'>{errors.size}</p>) : null}
        </label>
            <h2>Choose Your Sauce</h2>
            <p>Required</p>
        <label>
            <input type="checkbox" id="original" name="original" value={formState.original} onChange={inputChange}/>Original Red
        </label>
        <label>
            <input type="checkbox" id="garlicranch" name="garlicranch" value={formState.garlicranch} onChange={inputChange}/>Garlic Ranch
        </label>
        <label>
            <input type="checkbox" id="bbqsauce" name="bbqsauce" value={formState.bbqsauce} onChange={inputChange}/>Bar-B-Q Sauce
        </label>
        {errors.original.length > 0 ? (<p data-cy="sauceError" className='error'>{errors.sauce}</p>) : null}
            <h2>Choose Your Toppings</h2>
            <span>Choose Up To 8</span><br/>
                    <label><input type="checkbox" name="pepperoni" value={formState.pepperoni}  onChange={inputChange}/>Pepperoni</label>
                    <label><input type="checkbox" name="sausage" value={formState.sausage}  onChange={inputChange}/>Sausage</label>
                    <label><input type="checkbox" name="canadianbacon" value={formState.canadianbacon}  onChange={inputChange} />Canadian Bacon</label>
                    <label><input type="checkbox" name="italianSausage" value={formState.italianSausage} onChange={inputChange} />Spicy Italian Sausage</label>
                    <label><input type="checkbox" name="grilledChicken" value={formState.grilledChicken}  onChange={inputChange}/>Grilled Chicken</label>
                    <label><input type="checkbox" name="jalapenos" value={formState.jalapenos}  onChange={inputChange}/>Jalapenos</label>
                    <label><input type="checkbox" name="cheeseblend" value={formState.cheeseblend} onChange={inputChange} />3 Cheese Blend</label>
                    <label><input type="checkbox" name="extracheese" value={formState.extracheese}  onChange={inputChange}/>Extra Cheese</label>



            <label><h2>Special Instructions</h2><input type="textarea" id="special" name="special" placeholder="Anything Else You'd Like To Add?" value={formState.special} onChange={inputChange}/></label>
            <pre>{JSON.stringify(post, null, 2)}</pre>
      <button className="submit" disabled={buttonDisabled}>Submit</button>
</form>


</>
    )
}

export default Form;
