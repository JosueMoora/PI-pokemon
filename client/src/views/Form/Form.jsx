import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { createPokemon} from "../../redux/actions"
import style from './Form.module.css'
import { validation } from "./validate"
const Form = ()=> {
    const types = useSelector(state => state.types)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    //estado nuevo pokemon
    const [newPokemon, setNewPokemon] = useState({
        name: "",
        hp:"",
        attack:"",
        defense:"",
        speed:"",
        height:"",
        weight:"",
        image:"",
        typeOne:"",
        typeTwo:"",
    })
    //estado de errores
    const [errors, setErrors] = useState({
        name: "",
        hp:"",
        attack:"",
        defense:"",
        speed:"",
        height:"",
        weight:"",
        image:"",
        typeOne:"",
        typeTwo:"",
    })
    //controla estado de los inputs
   

const handleInputChange = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setErrors(validation({...newPokemon, [name]: value}));
    setNewPokemon({...newPokemon, [name]: value});
}

    const handleSubmit = (event) => {
        event.preventDefault()
        if ((Object.keys(errors)).length > 0){
            return alert("you must complete all required fields, and verify that no errors appear")
        }
        dispatch(createPokemon(newPokemon))
        alert('🎉 Pokemon successfully created! 🥳');
        navigate(-1)
        
    }
    
    return (
        <div>
        <form onSubmit={handleSubmit} className={style.form} >
                <div className={style.div}>
                <div>
                <input type="text" name="name" placeholder="Name *" value={newPokemon.name} onChange={handleInputChange} />
                {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

                <input type="number" name="hp" placeholder="HP *" value={newPokemon.hp} onChange={handleInputChange} /> 
                {errors.hp && <p style={{ color: "red" }}>{errors.hp}</p>}

                <input type="number" name="attack" placeholder="Attack *" value={newPokemon.attack} onChange={handleInputChange} />
                {errors.attack && <p style={{ color: "red" }}>{errors.attack}</p>}

                <input type="number" name="defense" placeholder="Defense *" value={newPokemon.defense} onChange={handleInputChange} /> 
                {errors.defense && <p style={{ color: "red" }}>{errors.defense}</p>}

                <input type="number" name="speed" placeholder="Speed" value={newPokemon.speed} onChange={handleInputChange} />
                </div>
                <div>
                <input type="number" name="height" placeholder="Height" value={newPokemon.height} onChange={handleInputChange} />

                <input type="number" name="weight" placeholder="Weight" value={newPokemon.weight} onChange={handleInputChange} />

                <input type="text" name="image" placeholder="Image" value={newPokemon.image} onChange={handleInputChange} />

                <select name="typeOne" value={newPokemon.typeOne} onChange={handleInputChange}>
                    <option selected >Primary type * </option>
                    {types?.map((type, i)=>(
                        <option key={i} value={type.name} name = {type.name} placeholder="">
                            {type.name}
                        </option>
                    ))}
                </select> 
                    {errors.typeOne && <p style={{ color: "red" }}>{errors.typeOne}</p>}
                <select name="typeTwo" value={newPokemon.typeTwo} onChange={e => handleInputChange(e)}>
                <option selected >Secundary type</option>
                    {types?.map((type, i)=>(
                        <option key={i} value={type.name} name = {type.name} placeholder="">
                            {type.name}
                        </option>
                    ))}
                </select>
                </div>
                <button>Create Pokemon</button>
                </div>
        </form>
        </div>
    )
}

export default Form