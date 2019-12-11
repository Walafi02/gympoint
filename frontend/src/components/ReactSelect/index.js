import React, { useRef, useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import PropTypes from 'prop-types';
import { useField } from '@rocketseat/unform';

export default function AsyncSelectInput({
  label,
  name,
  loadInputValue,
  loadOptions,
  setPlan,
}) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [inputName, setInputName] = useState('');
  const [selected, setSelected] = useState(null);

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

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}
      <AsyncSelect
        name={fieldName}
        selected={selected}
        getOptionValue={option => option.id}
        getOptionLabel={option => option.name || option.title}
        onChange={e => {
          setSelected(e.id);
          setPlan && setPlan(e);
        }}
        defaultOptions
        onInputChange={newValue => setInputName(newValue)}
        inputValue={inputName}
        loadOptions={loadOptions}
        ref={ref}
      />
      {error && <span>{error}</span>}
    </>
  );
}

AsyncSelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  loadInputValue: PropTypes.func.isRequired,
  loadOptions: PropTypes.func.isRequired,
  setPlan: PropTypes.func,
};

AsyncSelectInput.defaultProps = {
  setPlan: null,
};
