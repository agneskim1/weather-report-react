import React from 'react'

const SearchBar = ({locationCallBack}) => {
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
        <div>
            <label htmlFor="location"> Location</label>
            <input value = {formFields} onChange={handleChange}/>
        </div>
        <button className="location-search-button" type="submit" value="search">Search</button>    
    </form>
)
}

export default SearchBar;
