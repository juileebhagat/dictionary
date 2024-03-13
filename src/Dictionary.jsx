import React, { useState } from 'react'
import './Dictionary.css'
import Meaning from './Meaning';
import axios from 'axios';

const Dictionary = () => {

  const [userInput, setUserInput] = useState('');
  const [meaning, setMeaning] = useState([]);
  let tempMeaning = [];
  // const [myresponse, setMyresponse] = useState([])
  const [loading, setLoading] = useState(false)
  const setMyInput = (e) => {
    setUserInput(e.target.value)

  }

  const searchWord = async () => {

    setLoading(true)

    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${userInput}`
    //console.log(url);

    const res = await axios.get(url);
    let myresponse = res.data;
    console.log(res);

    tempMeaning = [];
    //console.log("temp meaning should be blank");

    for (const object of myresponse) {
      // console.log(object.meanings)
      for (const obj of object.meanings) {
        //console.log(obj);
        for (const def of obj.definitions) {
          let mydefination = def.definition
          tempMeaning.push(mydefination)
          //setMeaning([...meaning,mydefination]);
        }
      }
    }

    setMeaning([...tempMeaning])
    setLoading(false)
  }

  return (
    <div className='container'>
      <h1 className='heading'>The Great Dictionary</h1>
      <div className="input">
        <input type="text" name="userInput" id="userInput" className='userInput' placeholder='Serach word here..' onChange={setMyInput} />
        <button className='search-btn' onClick={searchWord}>Serach</button>
      </div>
      <div className="response-container">
        <hr className='h-line' />
        <h1>

          {
            (loading) ? 'Loading...' : ''
          }
        </h1>
        <ul>

          {

            meaning.map((m,index) => (<Meaning key={index} meaning={m} />))

          }
        </ul>
      </div>
    </div>
  )
}

export default Dictionary
