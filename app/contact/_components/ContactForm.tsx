'use client';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Button from '~/_components/Button';

type Inputs = {
  name: string;
  phone: string;
  email: string;
  content: string;
};

const ContactForm = () => {
  const [isThanksMessage, setIsThanksMessage] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<Inputs>({
    mode: 'onChange'
  });

  const onSubmit: SubmitHandler<Inputs> = () => {
    setValue('name', '');
    setValue('phone', '');
    setValue('email', '');
    setValue('content', '');
    setIsThanksMessage(true);

    setTimeout(() => {
      setIsThanksMessage(false);
    }, 3000);
  };
  return (
    <form
      onSubmit={(e) => {
        void handleSubmit(onSubmit)(e);
      }}
      className="font-quicksand"
    >
      <label className="block mb-2" htmlFor="name">
        Name
      </label>
      <input
        className="w-full mb-3 py-2 px-4 border"
        id="name"
        type="text"
        placeholder="Write your name"
        {...register('name', {
          required: 'Name is required'
        })}
      />
      {errors.name && <p className="text-red-600 text-xs -mt-2">{errors.name.message}</p>}
      <label className="block mb-2" htmlFor="phone">
        Phone
      </label>
      <input
        className="w-full mb-3 py-2 px-4 border"
        id="phone"
        type="tel"
        placeholder="Write your phone"
        {...register('phone', {
          required: 'Phone is required',
          pattern: {
            value: /^(0|[1-9]\d*)(\.\d+)?$/,
            message: 'Must contain only numbers'
          }
        })}
      />
      {errors.phone && <p className="text-red-600 text-xs -mt-2">{errors.phone.message}</p>}
      <label className="block mb-2" htmlFor="email">
        Email
      </label>
      <input
        className="w-full mb-3 py-2 px-4 border"
        id="email"
        type="email"
        placeholder="Write your email"
        {...register('email', {
          required: 'Email address is required'
        })}
      />
      {errors.email && <p className="text-red-600 text-xs -mt-2">{errors.email.message}</p>}
      <label className="block mb-2" htmlFor="content">
        Message
      </label>
      <textarea
        className="w-full mb-3 py-2 px-4 border"
        id="content"
        cols={30}
        rows={5}
        placeholder="Enter your message"
        {...register('content', {
          required: 'Message is required'
        })}
      ></textarea>
      {errors.content && <p className="text-red-600 text-xs -mt-2">{errors.content.message}</p>}
      <Button
        type="submit"
        label="Send message"
        fullWidth
        classes="uppercase font-quicksand mt-8"
      />
      <p className={`${isThanksMessage ? 'text-black mt-2 text-center' : 'hidden'}`}>
        Thanks for your message, we&apos;ll be in contact with you as soon as posible
      </p>
    </form>
  );
};

export default ContactForm;
