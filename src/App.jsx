import './App.css'
import { useState } from 'react'

function App() {
  const [formFields, setFormFields] = useState([{id: 1, name:'', age: '',error:{name:'', age:''}}])

  const deleteButton = (id) => {
    setFormFields(fields => fields.filter((field) => field.id !== id))
  }

  const addMoreButton = () => {
    const newField = {id: formFields.length+1, name: '', age: '', error: {name:'', age:''}}
    setFormFields((fields) => [...fields, newField])

  }

  const handleFormFieldChange = (event, id) => {
    const {name, value} = event.target;
    setFormFields((fields) => fields.map((field) => {
      if(field.id === id) {
        field[name] = value
      }
      return field
    }))
  }

  const validateInputs = () => {
    const validatedOutput = formFields.map(field => {
      field.error={name:'', age: ''}
      if(field.name === '') {
        field.error.name = 'Name is mandatory'
      } else if(field.name.length < 5) {
        field.error.name='Name length is lesser'
      }

      if(Number(field.age)<18 || Number(field.age)>100){
        field.error.age='Invalid age'
      }
      return field
    })
    setFormFields(validatedOutput)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!formFields.length)
      return
    validateInputs()
    console.log('submit',formFields)
    alert("Form submitted successfully")
  }

  return (
    <form className='border-2 p-4 border-b-blue-200 rounded-md' onSubmit={handleSubmit}>
      {formFields.map((field) => { return (<div className="flex justify-center items-baseline mb-4" key={field.id}>
              <div className='m-2'>
                <input className='p-2  border border-b-blue-300'  name="name" value={field.name} type="text" onChange={event => handleFormFieldChange(event, field.id)} placeholder='Name'/>
                <div className='text-left text-red-700'>{field.error.name}</div>
              </div>
              <div className='m-2'>
                <input className='p-2 border border-b-blue-300' name="age" value={field.age} type="number" onChange={event => handleFormFieldChange(event, field.id)}  placeholder='Age' />
                <div className='text-left text-red-700'>{field.error.age}</div>
              </div>
              <button type='button' className='mb-4' onClick={()=>deleteButton(field.id)}>- Remove</button>
        </div>)}
      )}
      <div className='flex justify-between mt-4'>
        <button type='button' onClick={addMoreButton}>+ Add More</button>
        <button type="submit">Submit</button>
      </div>
    </form>
  )
}

export default App
