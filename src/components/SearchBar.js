import React from 'react'
import './SearchBar.css'
import { Input, Button, InputGroup} from '@chakra-ui/react'

const SearchBar = ({ locationCallBack }) => {
    const [formFields, setFormFields] = React.useState("")
    const handleChange = event => setFormFields(
        event.target.value
    )
    const handleSubmit = event => {
        event.preventDefault()
        locationCallBack(formFields)
        setFormFields("")
    }
    return (
        <form className="location-form" onSubmit={handleSubmit}>
            <div className="location">
                {/* <label className="location-text" htmlFor="location"> Location</label> */}
            </div >
                <InputGroup marginTop={10} className="input-location"> 
                    <Input colorScheme="cyan" width="200px" className="location-box" value={formFields} onChange={handleChange} placeholder='cityname' />
                    <Button onClick = {handleSubmit}>Search</Button>
                </InputGroup>
        </form>
    )
}

export default SearchBar;
