import { useState, useEffect } from "react"
import { sendSubscribe } from "./email/subscribe"
import { validateEmail } from "./email/email-validator"
import { unsubscribeUser } from "./email/unsubscribe"

const NewsLetter = props => {
  const { placeholder } = props

  //-------------------------------------

  //Input type text Functions

  const [email, setEmail] = useState(() => {

  //reading data from localStorage

    const localEmail = localStorage.getItem('Email')
    const initialValue = localEmail
    if (localStorage.getItem('Email') !== null) {
      return initialValue
    } else {
      return placeholder
    }
  })

  useEffect(() => {
    //storing input email in localStorage
    const introducedEmail = email
    //console.log(introducedEmail)
    localStorage.setItem('Email', introducedEmail)
  }, [email])

  //------------------------------------------------------


  //Input type button Functions 

  let [isDisabled, setDisabled] = useState(false)
  let [isSubscribed, setSubscribe] = useState('Subscribe')
  let [status, setStatus] = useState(false);
  let [displayMode, setDisplay] = useState('block')
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const buttonState = localStorage.getItem('Button state')
    if (buttonState) {
      setSubscribe(JSON.parse(buttonState))
    }
  }, [])

  useEffect(() => {
    const statusState = localStorage.getItem('isSubmited')
    if (statusState) {
      setStatus(JSON.parse(statusState))
    }
  }, [])

  useEffect(() => {
    const displayMode = localStorage.getItem('displayMode')
    if (displayMode) {
      setDisplay(JSON.parse(displayMode))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('Button state', JSON.stringify(isSubscribed))
    localStorage.setItem('isSubmited', JSON.stringify(status))
    localStorage.setItem('displayMode', JSON.stringify(displayMode))
  })

  let introducedEmail = email

  const submitClickButton = async () => {
    subscribeEmail(introducedEmail)   //change the button style and set in local storage isSubscribed to true
    sendSubscribe(introducedEmail)  //send subscribe fetch to the server

    // prevent additional requests upon clicking on "Subscribe" and "Unsubscribe".

    if (isDisabled) return // do nothing if request already made
    disableBtn()
    const response = await fetchMock()  //eslint-disable-line
    enableBtn()

    setStatus(true)

    if (validateEmail(introducedEmail) == false) {
      setStatus(false)
    }
  }

  const fetchMock = () => {
    return new Promise(resolve => setTimeout(() => resolve('hello'), 2000))
  }


  const disableBtn = () => {
    setOpacity(0.5)
    setDisabled(true);
  }
  const enableBtn = () => {
    setOpacity(1)
    setDisabled(false);
  }

  const undoClickButton = () => {
    unsubscribeEmail()
    setStatus(false)
  }

  const changeButtonState = () => {
    status ? undoClickButton() : submitClickButton()
  }

  const subscribe = () => {
    setSubscribe('Unsubscribe')
    localStorage.setItem('isSubscribed', 'true')
    setDisplay('none')
    console.log(status)
  }

  const unsubscribe = () => {
    setSubscribe('Subscribe')
    localStorage.setItem('isSubscribed', 'false')
    setDisplay('block')
    console.log(status)
  }

  const subscribeEmail = (email) => {
    const isValidEmail = validateEmail(email)
    if (isValidEmail === true) {
      subscribe()
    } else if (isValidEmail === false) {
      unsubscribe()
    }
  }

  const unsubscribeEmail = () => {
    unsubscribe()
    unsubscribeUser()
    setEmail('')
    localStorage.removeItem('Email')
  }
  //--------------------------------------

  return (
    <>
    <main id='app-container'>
      <section className='app-section app-section--image-program' id='programContainer'>
        <h2 className='program-title'>Join Our Program</h2>
        <h3 className='program-subtitle'>Sed do eiusmod tempor incididunt<br />ut labore et dolore magna aliqua</h3>
        <form className='submitFieldWrapper' id='form'>
          <div
          className="form-wrapper"
          id="emailForm"
            style={{
              display: displayMode
            }}
            >
            <input
              className='form-input'
              id='submit-info'
              type='text'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <input
            id='subscribeButton'
            className='app-section__button submit-btn'
            type='button'
            value={isSubscribed}
            style={{
              opacity
            }}
            onClick={() => { changeButtonState() }}
            disabled={isDisabled} ></input>
        </form>
      </section>
      </main>
    </>
  )
}

export default NewsLetter