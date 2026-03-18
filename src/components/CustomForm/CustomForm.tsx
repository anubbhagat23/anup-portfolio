import { useState } from 'react';
import './CustomForm.css';

type FormValues = {
	name: string;
	email: string;
	phone: string;
	blogUrl: string;
};

const initialValues: FormValues = {
	name: '',
	email: '',
	phone: '',
	blogUrl: '',
};

const validators = {
	name: (value: string) => {
		if (value.length < 3 || value.length > 30) return 'Name must be 3-30 characters.';
		if (!/^[A-Za-z]+$/.test(value)) return 'Name must contain only letters.';
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
		if (!/^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/.*)?$/.test(value))
			return 'Enter a valid blog URL.';
		return '';
	},
};

export default function CustomForm() {
	const [values, setValues] = useState<FormValues>(initialValues);
	const [errors, setErrors] = useState<Partial<FormValues>>({});
	const [success, setSuccess] = useState('');

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setValues((prev) => ({ ...prev, [name]: value }));
	};

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
	};

	return (
		<section className="custom-form" aria-labelledby="custom-form-title">
			<h2 id="custom-form-title">Contact Form</h2>
			<form onSubmit={onSubmit}>
				<fieldset>
					<legend>Required details</legend>
					<div>
						<label htmlFor="custom-name">Name</label>
						<input id="custom-name" name="name" value={values.name} onChange={onChange} />
						{errors.name && <p className="form-error">{errors.name}</p>}
					</div>

					<div>
						<label htmlFor="custom-email">Email</label>
						<input id="custom-email" name="email" value={values.email} onChange={onChange} />
						{errors.email && <p className="form-error">{errors.email}</p>}
					</div>

					<div>
						<label htmlFor="custom-phone">Phone</label>
						<input id="custom-phone" name="phone" value={values.phone} onChange={onChange} />
						{errors.phone && <p className="form-error">{errors.phone}</p>}
					</div>

					<div>
						<label htmlFor="custom-blogUrl">Blog URL</label>
						<input id="custom-blogUrl" name="blogUrl" value={values.blogUrl} onChange={onChange} />
						{errors.blogUrl && <p className="form-error">{errors.blogUrl}</p>}
					</div>

					<button type="submit">Submit</button>
					{success && <p className="form-status" role="status">{success}</p>}
				</fieldset>
			</form>
		</section>
	);
}