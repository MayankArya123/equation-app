
import './App.css';
import {useEffect,useState} from 'react'
import axios from 'axios'

function App() {

const [Letters,setLetters]   = useState([])



const [signs,setSigns] = useState(['+','-','*','/'])



const [selected,setSelected] = useState(null)

const [comparesign,setcomparesign] = useState(false)


const [integer,setinteger] = useState(false)

const [list,setlist] = useState([])






const evaluate=  async ()=>{

console.log('checkingList',list)

//checking equation validatio


if(list.length !== 3 && list.length !== 5){

  console.log(list.length)

  prompt('wrong equation')

}

if(list.length === 3){
  
const v1=list[0].letter

const sign=list[1].sign

const v2=list[2].letter


  if( typeof(v1) === 'string'  && typeof(v2) === 'string' && typeof(sign) === 'string'  ) {

    console.log('right 3 block equation')


    // const ans = v

alert('right 3 block level equation')
  
  }

  else {

    alert('wrong equation')

  }
  

}


if(list.length === 5){




  try{



    const result = await axios.post('https://math-equation1.herokuapp.com/solve_equation',{
      value1:list[0].value,
      operationSign:list[1].sign,
      value2:list[2].value,
      compareSign:list[3].sign,
      compareResult:list[4].rhs
    })
  
    console.log('result',result)
  
  
    const {operation_result,succs,message} = result.data
  
  
    alert(`${succs} ${operation_result} ${message} then ${integer} `)
  
  }
  catch(err){
  
  console.log('error while evaluating',err.response)

  alert('wrong equation')
  
  }

}







}


const addRHS=()=>{

  console.log('rhs')

  let age = prompt('add the integer?', );


  if(!age){
    return
  }

  console.log(integer)

  if(integer){


    console.log('integer age' ,integer ,age)

    if(integer === age){

      console.log('this integer is already added')

    }

    else {

//removing previous integer and adding new one


const filter = list.filter((EF)=>EF.sign !== integer)

console.log('filtered array',filter)

     setinteger(parseInt(age))

      setlist([...filter,{
        rhs:parseInt(age)
      }])

      
    }


  }

  else {


    console.log('no integer added adding')

    setinteger(parseInt(age))

    setlist([...list,{
      rhs:parseInt(age)
    }])

  }



  
}


const remove=(EI)=>{

console.log('remove hitt')

if(EI.letter){

  const filter = list.filter((EL)=>EL.letter !== EI.letter)

  setlist(filter)

}

else if(EI.sign) {

  const filter = list.filter((EL)=>EL.sign !== EI.sign)

  setlist(filter)

}

else {

  const filter = list.filter((EL)=>EL.rhs !== EI.rhs)

  setlist(filter)

}

}


function moveCard(i) {


  if(selected.letter){
    setlist([...list,selected])
  
    // const filter = Letters.filter((EL)=>EL.letter !== selected.letter)
  
    // setLetters(filter)
  }

  else {
    setlist([...list,{
      sign:selected
    }])
  
    // const filter = signs.filter((EL)=>EL.sign !== selected)
  
    // setSigns(filter)
  }


}


const addCompareSign=(e)=>{
 

if(comparesign.sign){

  if(comparesign.sign === e) {

    console.log('already addeed')

  }

  else {

    console.log('list',list)

    const filter = list.filter((EF)=>EF.sign !== comparesign.sign)

    console.log('filtered array',filter)

    setcomparesign({
      sign:e
    })

    setlist([...filter,{
      sign:e
    }])
  
  }
  
}
else{

  setcomparesign({
    sign:e
  })

  setlist([...list,{
    sign:e
  }])

}


}

function handleDragOver(e) {

  console.log(list)
    // setIsOver(true);
    
    e.preventDefault();
}

function handleDragLeave() {
  console.log(list)
  // setIsOver(false);
}

function handleDragStart(EL) {
  
  console.log(EL)

  setSelected(EL)
  // setIsDragging(true);
  // list.push(EL)
  // const data = JSON.stringify({ type: "card" });
  // e.dataTransfer.setData("text/plain", data);
}

function handleDragEnd(e) {
  console.log(list)
  // setIsDragging(false);

}

function handleDrop(e) {
  console.log(list)
  moveCard()

}

useEffect( async ()=>{

  const API = axios.create({ baseURL: 'https://math-equation1.herokuapp.com'})

 const letters = await API.get('/alphabets')

 console.log(letters)

 setLetters(letters.data)


},[])

  return (
    <div className="App">
  
    <div className="layer-1 letters">
    
    {
      Letters.length > 0 && Letters.map((EL)=>{

return  <div className="character" 
draggable
onDragStart={()=>handleDragStart(EL)}
onDragEnd={()=>handleDragEnd} 
>

{EL.letter}

</div>

      })

    }
    
    </div>


    <div className="layer-2 signs">
    

{

    signs.map((ES)=> <div   draggable
    onDragStart={()=>handleDragStart(ES)}
    onDragEnd={()=>handleDragEnd}    className="sign">{ES}</div>)

}



<div  value='<' onClick={(e)=> addCompareSign('<')} className="sign"> {'<'} </div>
<div   value=">" onClick={(e)=> addCompareSign('>')}   className="sign"> {'>'} </div>

<div className="sign" onClick={()=>addRHS()} >  RHS integer</div>




    
    </div>


    <div className="layer-3 equation"  onDrop={handleDrop}  onDragLeave={handleDragLeave} onDragOver={handleDragOver}  >
    
    {
      list.length > 0 && list.map((EI)=>{

        return <div className={EI.letter ? 'character' : typeof(EI.sign) === 'string' ? 'sign' : 'rhs-value' }>
        
        {
          EI.letter ? EI.letter : EI.sign ? EI.sign : EI.rhs
        }
        

        <button className='delete-btn'  onClick={()=>remove(EI)}  > delete </button>
        </div>

      })
    }
    
    
    
    </div>


    <div className="btn btn-primary" onClick={()=>evaluate()} >
       evaluate
    </div>



    </div>
  );
}

export default App;
