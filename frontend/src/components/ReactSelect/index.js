import React, { useRef, useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import { useField } from '@rocketseat/unform';
import api from '~/services/api';

export default function AsyncSelectInput({
  label,
  name,
  loadInputValue,
  loadOptions,
  ...rest
}) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [inputName, setInputName] = useState('');
  const [selected, setSelected] = useState(null);

  // async function loadStudent(id, setName) {
  //   const { data } = await api.get(`students/${id}`);
  //   setName(data.name);
  // }

  useEffect(() => {
    if (defaultValue !== null) {
      setSelected(defaultValue);
      loadInputValue(defaultValue, setInputName);
    }
  }, [defaultValue]);  // eslint-disable-line

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: selectedRef => {
        selectedRef.clear();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  // async function loadStudents(inputValue) {
  //   const { data } = await api.get('students', {
  //     params: {
  //       name: inputValue,
  //     },
  //   });

  //   return data.docs;
  // }

  // const loadOptions = (inputValue, callback) => {
  //   // console.log(inputValue);
  //   callback(loadStudents(inputValue));
  // };

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}
      <AsyncSelect
        name={fieldName}
        selected={selected}
        getOptionValue={option => option.id}
        getOptionLabel={option => option.name || option.title}
        onChange={e => setSelected(e.id)}
        defaultOptions
        onInputChange={newValue => setInputName(newValue)}
        inputValue={inputName}
        loadOptions={loadOptions}
        ref={ref}
        // {...rest}
      />
      {error && <span>{error}</span>}
    </>
  );
}
