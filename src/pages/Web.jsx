import React from 'react'
import WebBox from '../components/web/WebBox'
import "../styles/web.css";
import WebHeader from '../components/web/WebHeader';
import { useWeb } from '../context/WebContext';


const Web = () => {
  
  const {websites} = useWeb();


  return (
    <div className='fullXY withPadding flexCol gapLG'>
      <WebHeader />
      <div className="webBoxes">
        {
          websites &&
          websites.length > 0 &&
          websites.map((item) => {
            return (
              <WebBox key={item?._id} data={item} />
            )
          })
        }
      </div>
    </div>
  )
}

export default Web