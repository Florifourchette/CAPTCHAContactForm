import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import '../src/styles/desktop_style.css';
import { Form } from 'semantic-ui-react';
import validateEmail from './utils/EmailValidation';
import validateMessage from './utils/MessageValidation';
import '../src/styles/media_style.css';

function App() {
  const [answer, setAnswer] = useState({
    vorname: '',
    nachname: '',
    email: '',
    betreff: '',
    message: '',
  });
  const [emailValidated, setEmailValidated] = useState(null);
  const [messageCharCount, setMessageCharCount] = useState(null);
  const [formsubmitted, setformSubmitted] = useState(null);
  const [formDeleted, setFormDeleted] = useState(null);
  const [captchaDone, setCaptchaDone] = useState(false);
  const siteKey = process.env.REACT_APP_SITE_KEY;

  //on change, all the useStates should first be back to their initial state. Then the value that has been changed is being checked the answer is being changed via a useState after the email and message validation
  const handleChange = (e) => {
    setFormDeleted(null);
    setformSubmitted(null);
    if (e.target.name === 'email') {
      validateEmail(e.target.value)
        ? setEmailValidated(true)
        : setEmailValidated(false);
    }

    if (e.target.name === 'message') {
      validateMessage(e.target.value)
        ? setMessageCharCount(true)
        : setMessageCharCount(false);
    }
    setAnswer((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  //before submitting, the validation has to run and check if all conditions are met to submit the form if not, the form will not be submitted and a message will inform the user
  const handleSubmit = () => {
    if (
      emailValidated &&
      messageCharCount &&
      answer.vorname !== '' &&
      answer.nachname !== '' &&
      answer.betreff !== '' &&
      answer.message !== ''
    ) {
      setformSubmitted(true);
      console.log({ answer });
    } else {
      setformSubmitted(false);
    }
  };

  //the deletion will set the answer and the validations variables to their inital states
  const handleDeletion = () => {
    setAnswer({
      vorname: '',
      nachname: '',
      email: '',
      betreff: '',
      message: '',
    });
    setEmailValidated(null);
    setMessageCharCount(null);
    setFormDeleted(true);
  };

  //checking captcha if captcha not checked then the submit button does not appear
  const handleCaptcha = () => {
    setCaptchaDone(true);
  };

  return (
    <>
      <Form className="form_container" onSubmit={handleSubmit}>
        <h1 className="title">Kontaktieren Sie uns</h1>
        <Form.Group>
          <div className="form_details">
            <Form.Input
              name="vorname"
              placeholder="Vorname"
              value={answer.vorname}
              onChange={handleChange}
            />
            <Form.Input
              name="nachname"
              placeholder="Nachname"
              value={answer.nachname}
              onChange={handleChange}
            />
          </div>
          <Form.Input
            className="email"
            name="email"
            placeholder="E-Mail-Adresse"
            value={answer.email}
            onChange={handleChange}
          />
          {/* if email has been validated then valid message, if not, invalid message if null then no message */}
          {emailValidated ? (
            <p className="valid">
              ✅ Ihre E-Mail Adresse ist korrekt
            </p>
          ) : emailValidated === null ? (
            <></>
          ) : (
            <p className="invalid">
              ❌ Bitte geben Sie eine gültige E-Mail Adresse ein
            </p>
          )}
          <Form.Input
            className="betreff"
            name="betreff"
            placeholder="Betreff"
            value={answer.betreff}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.TextArea
          name="message"
          placeholder="Nachrichtentext"
          value={answer.message}
          onChange={handleChange}
        />
        <span className="CharCount">
          {!messageCharCount
            ? 500 - answer.message.toString().length
            : 500 - answer.message.toString().length}
          /500
        </span>
        {/* There are 3 different possibilities for messageCharCount: null: nothing showing, true or false */}
        {messageCharCount ? (
          <p className="valid">✅ Your message is not too long</p>
        ) : messageCharCount === null ? (
          <></>
        ) : (
          <p className="invalid">❌ Your message is too long</p>
        )}
        <div className="buttonsContainer">
          {/* either the captcha or the button are showing */}
          {!captchaDone ? (
            <ReCAPTCHA sitekey={siteKey} onChange={handleCaptcha} />
          ) : (
            <Form.Button>Submit</Form.Button>
          )}
          {/* if the form has been validated then valid message, if not, invalid message if null then no message */}
          {formsubmitted ? (
            <p className="invalid">✅ Form submitted successfully</p>
          ) : formsubmitted === null || formDeleted ? (
            <></>
          ) : (
            <p className="invalid">
              ❌ The form contains some mistakes, please check it!
            </p>
          )}
          <button onClick={handleDeletion}>Zurücksetzen</button>
        </div>
      </Form>
    </>
  );
}

export default App;
