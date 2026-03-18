import React, { useState } from 'react';
import './FormBuilder.css'

type FieldType = 'text' | 'number' | 'tel' | 'select';

interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string;
  options?: string[]; // For select type
}

interface FormBuilderProps {
  fields: FieldConfig[];
  onSubmit: (values: Record<string, any>) => void;
}

// Validation logic separated for modularity
const validateField = (field: FieldConfig, value: any): string => {
  if (field.required && !value) {
    return `${field.label} is required.`;
  }
  if (field.type === 'text') {
    if (field.minLength && value.length < field.minLength) {
      return `${field.label} must be at least ${field.minLength} characters.`;
    }
    if (field.maxLength && value.length > field.maxLength) {
      return `${field.label} must be at most ${field.maxLength} characters.`;
    }
  }
  if (field.type === 'number') {
    if (field.min !== undefined && value < field.min) {
      return `${field.label} must be at least ${field.min}.`;
    }
    if (field.max !== undefined && value > field.max) {
      return `${field.label} must be at most ${field.max}.`;
    }
  }
  if (field.pattern && value && !new RegExp(field.pattern).test(value)) {
    return `${field.label} format is invalid.`;
  }
  return '';
};

// Modular input renderer
const renderInput = (
  field: FieldConfig,
  value: any,
  onChange: (name: string, value: any) => void
) => {
  switch (field.type) {
    case 'select':
      return (
        <select
          id={field.name}
          name={field.name}
          value={value || ''}
          required={field.required}
          onChange={(e) => onChange(field.name, e.target.value)}
        >
          <option value="">Select {field.label}</option>
          {field.options?.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      );
    default:
      return (
        <input
          id={field.name}
          name={field.name}
          type={field.type}
          value={value || ''}
          required={field.required}
          minLength={field.minLength}
          maxLength={field.maxLength}
          min={field.min}
          max={field.max}
          pattern={field.pattern}
          onChange={(e) =>
            onChange(
              field.name,
              field.type === 'number' ? Number(e.target.value) : e.target.value
            )
          }
        />
      );
  }
};

const FormBuilder: React.FC<FormBuilderProps> = ({ fields, onSubmit }) => {
  const [values, setValues] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (name: string, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    const newErrors: Record<string, string> = {};
    fields.forEach((field) => {
      const error = validateField(field, values[field.name]);
      if (error) {
        valid = false;
        newErrors[field.name] = error;
      }
    });
    setErrors(newErrors);
    if (valid) {
      onSubmit(values);
    }
  };

  return (
    <form className="form-builder">
      {fields.map((field) => (
        <FormField
          key={field.name}
          field={field}
          value={values[field.name]}
          error={errors[field.name]}
          onChange={handleChange}
        />
      ))}
      <button type="submit" onClick={handleSubmit}>Submit</button>
    </form>
  );
};

// Modular FormField component
interface FormFieldProps {
  field: FieldConfig;
  value: any;
  error?: string;
  onChange: (name: string, value: any) => void;
}

const FormField: React.FC<FormFieldProps> = ({ field, value, error, onChange }) => (
  <div className="form-group">
    <label htmlFor={field.name}>{field.label}</label>
    {renderInput(field, value, onChange)}
    {error && <span className="error">{error}</span>}
  </div>
);

export default FormBuilder;