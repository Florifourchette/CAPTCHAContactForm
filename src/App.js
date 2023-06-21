import React, { useState } from 'react';
import '../src/styles/desktop_style.css';
import { Form } from 'semantic-ui-react';
import validateEmail from './utils/EmailValidation';
import validateMessage from './utils/MessageValidation';

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
      console.log(answer);
    } else {
      setformSubmitted(false);
    }
  };

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

  console.log(formsubmitted);

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
            name="email"
            placeholder="E-Mail-Adresse"
            value={answer.email}
            onChange={handleChange}
          />
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
        {messageCharCount ? (
          <p className="valid">✅ Your message is not too long</p>
        ) : messageCharCount === null ? (
          <></>
        ) : (
          <p className="invalid">❌ Your message is too long</p>
        )}
        <div className="buttonsContainer">
          <Form.Button>Submit</Form.Button>
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
