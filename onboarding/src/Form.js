import React, { useState, useEffect } from 'react'
import * as yup from 'yup'
import axios from 'axios'


const formSchema = yup.object().shape({
    name: yup.string()
    .min(3, "username must be at least 3 characters")
    .required("Name is a required field"),
    email: yup.string().email("must include a valid email address").required("must include email address"),
    motivation: yup.string().required("must include why you like to join"),
    positions: yup.string("must select one"),
    terms: yup.boolean().oneOf([true], "Please agree to terms of use")
})
function Form() {
    const [post, setPost] = useState([])
    const [isDisabled, setDisabled] = useState(true)

const [formState, setFormState] = useState({
    name: "",
    email: "",
    motivation: "",
    positions: "",
    terms: false
})

const [errorState, setErrorState] = useState({
    name: "",
    email: "",
    motivation: "",
    positions: "",
    terms: ""
})


const validate = (e) => {
   
yup.reach(formSchema, e.target.name).validate(e.target.value)
.then( valid => {
    setErrorState({
        ...errorState,
        [e.target.name]: ""
    })
})
.catch(err => {
    console.log(err.errors)
    setErrorState({
        ...errorState,
        [e.target.name]: err.errors[0]
    })
})
}

useEffect(() => {
    formSchema.isValid(formState).then(valid => {
        setDisabled(!valid);
      });
}, [formState])

const inputChange = e => {
    e.persist()
    validate(e)
    setFormState({ ...formState, [e.target.name]: e.target.value })

}

// const inputNameChange = e => {
//     e.persist()
//     validate(e)
//     setFormState({ ...formState, name: e.target.value })
// }

const checkBoxChange = e => {
    e.persist()
    validate(e)
    setFormState({ ...formState, terms: e.target.checked })

}

const formSubmit = (e) => {
    e.preventDefault()
    console.log("form submitted")
    axios.post('https://reqres.in/api/users', formState)
    .then( response => 
        setPost([...post, `A name was submitted: ${response.data.name.trim()}, their email is: ${response.data.email.trim()}, and their motivation is: ${response.data.motivation}. his position is ${response.data.positions} agreed ${response.data.terms}`]))
          
    
    .catch(err => console.log(err))
}


    return (
        <div>
            <div>{post.map(item => <div>{item}</div>)}</div> 
           

            hey
            <form onSubmit={formSubmit}>
                <div>
                <label htmlFor="name">
                    name
                    <input 
                    type="text"
                     name="name" 
                     id="name"
                     value={formState.name}
                     onChange={inputChange}
                     
                     />
                     {errorState.name ? <p>{errorState.name}</p> : null}
                </label>
                </div>
                <div>
                <label htmlFor="email">
                    email
                    <input 
                    type="text"
                     name="email" 
                     id="email"
                     value={formState.email}
                     onChange={inputChange}
                     />
                     {errorState.email.length > 0 ? <p>{errorState.email}</p> : null}
                </label>

                </div>
                <div>
                <label htmlFor="motivation">
                    motivation
                    <textarea
                    type="text"
                     name="motivation" 
                     id="motivation"
                     value={formState.motivation}
                     onChange={inputChange}
                     />
                </label>
                </div>
                <div>
                <label htmlFor="positions">
                    what would you like help with
                    <select 
                    value={formState.position} 
                    name="positions" 
                    id="positions" 
                    onChange={inputChange}>
                        <option value="Newsletter">Newsletter</option>
                        <option value="Yard work">Yard work</option>
                        <option value="tabling">tabling</option>
                    </select>
                </label>
                </div>
                <div>
                    <label htmlFor="terms">
                        <input 
                        type="checkbox"
                        id="terms" 
                        name="terms"
                        checked={formState.terms}
                        onChange={checkBoxChange} />
                        i have read the terms and conditions

                    </label>
                </div>
                <button disabled={isDisabled}>submit</button>

            </form>
        </div>
    )
}
export default Form