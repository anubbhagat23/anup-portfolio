import { useState } from 'react';
import { Link } from 'react-router-dom';
import FormBuilder from '../../components/common/FormBuilder';
import Timer from '../../components/common/Timer';
import ChatApp from '../../components/chat/ChatApp';
import CustomForm from '../../components/CustomForm/CustomForm';
import FormWithValidation from '../../components/CustomForm/FormWithValidation';
import InfiniteScrollList from '../../components/infinite-scroll/InfiniteScrollList';
import SearchAutoComplete from '../../components/autocomplete/SearchAutoComplete';
import StarRating from '../../components/star-rating/StarRating';
import { codeSamples } from './codeSamples';
import './LearnWithAnup.scss';

const formFields = [
  {
    name: 'name',
    label: 'Name',
    type: 'text' as const,
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: '^[a-zA-Z]+(?: [a-zA-Z]+)*$',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'text' as const,
    required: true,
    pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
  },
  {
    name: 'age',
    label: 'Age',
    type: 'number' as const,
    required: false,
    min: 0,
    max: 120,
  },
  {
    name: 'gender',
    label: 'Gender',
    type: 'select' as const,
    required: false,
    options: ['Male', 'Female', 'Other'],
  },
  {
    name: 'phone',
    label: 'Phone Number',
    type: 'tel' as const,
    required: true,
    pattern: '^[2-9]\\d{9}$',
  },
];

const cards = [
  {
    id: 'timer',
    title: 'Timer',
    description: 'A compact stopwatch with start, pause, and reset controls plus automatic cleanup.',
    component: <Timer />,
    code: codeSamples['timer'],
  },
  {
    id: 'form-builder',
    title: 'Form Builder',
    description: 'Config-driven form generator with inline validation and select support.',
    component: (
      <FormBuilder
        fields={formFields}
        onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
      />
    ),
    code: codeSamples['form-builder'],
  },
  {
    id: 'autocomplete',
    title: 'Search Auto Complete',
    description: 'Debounced search input with keyboard navigation and selectable results.',
    component: <SearchAutoComplete />,
    code: codeSamples['autocomplete'],
  },
  {
    id: 'custom-form',
    title: 'Custom Form',
    description: 'Hand-crafted form with validators for name, email, phone, and blog URL.',
    component: <CustomForm />,
    code: codeSamples['custom-form'],
  },
  {
    id: 'validation-form',
    title: 'Form with Validation',
    description: 'Submit-time validation demo with error summaries and success state.',
    component: <FormWithValidation />,
    code: codeSamples['validation-form'],
  },
  {
    id: 'chat',
    title: 'Chat App',
    description: 'Mini chat UI with message bubbles, timestamps, and input handling.',
    component: <ChatApp />,
    code: codeSamples['chat'],
  },
  {
    id: 'infinite-scroll',
    title: 'Infinite Scroll List',
    description: 'IntersectionObserver-based feed that loads more items as you scroll.',
    component: <InfiniteScrollList />,
    code: codeSamples['infinite-scroll'],
  },
  {
    id: 'star-rating',
    title: 'Star Rating',
    description: 'Accessible star rating with hover, keyboard input, and half-star support.',
    component: <StarRating />,
    code: codeSamples['star-rating'],
  },
];

function LearnWithAnup() {
  const [openCardId, setOpenCardId] = useState<string | null>(null);

  return (
    <div className="learn-page">
      <header className="learn-hero">
        <div className="learn-hero-content">
          <p className="learn-eyebrow">Playground</p>
          <h1 className="learn-title">Learn with Anup</h1>
          <p className="learn-subtitle">
            A small gallery of reusable components and experiments built while
            practicing UI patterns.
          </p>
          <Link to="/" className="learn-back">
            Back to Portfolio
          </Link>
        </div>
      </header>

      <section className="learn-grid">
        {cards.map((card) => {
          const isOpen = openCardId === card.id;
          return (
            <div
              key={card.id}
              className={`learn-card ${isOpen ? 'learn-card--expanded' : ''}`}
            >
              <div className="learn-card-header">
                <h2 className="learn-card-title">{card.title}</h2>
                <button
                  type="button"
                  className="learn-code-toggle"
                  onClick={() => setOpenCardId(isOpen ? null : card.id)}
                >
                  {isOpen ? 'Hide code' : 'View code'}
                </button>
              </div>
              <p className="learn-card-desc">{card.description}</p>
              <div className={`learn-card-split ${isOpen ? 'is-open' : ''}`}>
                <div className="learn-card-body">{card.component}</div>
                {isOpen && (
                  <pre className="learn-code">
                    <code>{card.code}</code>
                  </pre>
                )}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default LearnWithAnup;