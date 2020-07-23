import React, { useState, useEffect } from 'react'
import * as yup from 'yup'
import axios from 'axios'
import styled from 'styled-components'

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
        setPost([...post, <Team>`name: {response.data.name.trim()},  Email: {response.data.email.trim()}, motivation: {response.data.motivation}. position: {response.data.positions} agreed {response.data.terms}`</Team>]))
          
    
    .catch(err => console.log(err))
}


    return (
        <div>
            <div>{post.map(item => <div>{item}</div>)}</div> 
           

            hey
            <form onSubmit={formSubmit}>
                <FullPage>
                <NameDiv>
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
                </NameDiv>
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
                <EmailDiv>
                <label htmlFor="motivation">
                    password
                    <input
                    type="text"
                     name="motivation" 
                     id="motivation"
                     value={formState.motivation}
                     onChange={inputChange}
                     />
                </label>
                </EmailDiv>
                <DropDown>
                <label htmlFor="positions">
                    <div>what would you like help with</div>
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
                </DropDown>
                <Terms>
                    <label htmlFor="terms">
                        <input 
                        type="checkbox"
                        id="terms" 
                        name="terms"
                        checked={formState.terms}
                        onChange={checkBoxChange} />
                        <p>i have read the terms and conditions</p>

                    </label>
                </Terms>
                <button disabled={isDisabled}>submit</button>
                </FullPage>
            </form>
        </div>
    )
}
const FullPage = styled.div`
border: 1px solid black;
margin: 100px;
padding: 50px;
`
const NameDiv = styled.div`
margin: 25px;
`
const EmailDiv = styled.div`
margin:25px;
`
const DropDown = styled.div`
margin: 25px;
display: flex;
flex-direction: column;
`
const Terms = styled.div`
margin: 25px;
justify-content: flex-end;
`
const Team = styled.div`
transition: box-shadow .3s;
color: white;
background-color: black;
display: flex;
flex-direction: column;
flex-wrap: wrap;
max-width: 100px;
border: 1px solid black;
margin: 10px;
padding: 40px;
padding-right: 150px;
border-radius: 15px;

&:hover{
    box-shadow: 0 0 19px 
    rgba(43,43,43,.5); 
  }

`
export default Form