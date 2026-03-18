import React from 'react';
import './FormWithValidation.css';

type FormValues = {
    name: string;
    email: string;
    phone: string;
    blogUrl: string;
}

const initialValues: FormValues = {
    name: '',
    email: '',
    phone: '',
    blogUrl: '',
};

const validators = {
    name: (value: string) => {
        if (value.length < 3 || value.length > 30) return 'Name must be 3-30 characters.';
        if (!/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(value)) return 'Name must contain only letters.';
        return '';
    },
    email: (value: string) => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email.';
        return '';
    },
    phone: (value: string) => {
        if (!/^[2-9]\d{9}$/.test(value)) return 'Phone must be 10 digits and not start with 0 or 1.';
        return '';
    },
    blogUrl: (value: string) => {
        if (!/^(https?:\/\/)?(www\.)?[a-zA-Z0-9]+\.[a-zA-Z]{2,}(\/.*)?$/.test(value))
            return 'Enter a valid URL.';
        return '';
    },
}

const FormWithValidation: React.FC = () => {
    const [values, setValues] = React.useState<FormValues>(initialValues);
    const [errors, setErrors] = React.useState<Partial<FormValues>>({});
    const [success, setSuccess] = React.useState('');

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    }

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const nextErrors: Partial<FormValues> = {
            name: validators.name(values.name.trim()),
            email: validators.email(values.email.trim()),
            phone: validators.phone(values.phone.trim()),
            blogUrl: validators.blogUrl(values.blogUrl.trim()),
        };
        setErrors(nextErrors);
        const hasError = Object.values(nextErrors).some(Boolean);
        setSuccess(hasError ? 'Form is Incomplete' : 'Form is Complete');
    }
    return (
        <section className="validation-form" aria-labelledby="validation-form-title">
            <h2 id="validation-form-title">Contact Form</h2>
            <form onSubmit={onSubmit}>
                <fieldset>
                    <legend>Required details</legend>
                    <div>
                        <label htmlFor="validation-name">Name:</label>
                        <input id="validation-name" name="name" onChange={onChange} value={values.name} />
                        {errors.name && <p className="form-error">{errors.name}</p>}
                    </div>
                    <div>
                        <label htmlFor="validation-email">Email:</label>
                        <input id="validation-email" name="email" onChange={onChange} value={values.email} />
                        {errors.email && <p className="form-error">{errors.email}</p>}
                    </div>
                    <div>
                        <label htmlFor="validation-phone">Phone:</label>
                        <input id="validation-phone" name="phone" onChange={onChange} value={values.phone} />
                        {errors.phone && <p className="form-error">{errors.phone}</p>}
                    </div>
                    <div>
                        <label htmlFor="validation-blogUrl">BlogUrl:</label>
                        <input id="validation-blogUrl" name="blogUrl" onChange={onChange} value={values.blogUrl} />
                        {errors.blogUrl && <p className="form-error">{errors.blogUrl}</p>}
                    </div>
                    <div className="validation-actions">
                        <button type="submit">Submit</button>
                        {success && <p className="form-status">{success}</p>}
                    </div>
                </fieldset>
            </form>
        </section>
    );

}

export default FormWithValidation;