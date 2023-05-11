import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Head from '~/components/globals/Head';
import Button from '~/components/globals/button/Button';

import keywords from '~/data/keywords.json';
import Container from '~/layouts/Container';

const { NEXT_PUBLIC_BASE_URL } = process.env;

type Inputs = {
  name: string;
  phone: string;
  email: string;
  content: string;
};

const Contact = () => {
  const [isThanksMessage, setIsThanksMessage] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<Inputs>({
    mode: 'onChange'
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
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
    <>
      <Head
        title="SquareOne - Contact us"
        description="Sit excepteur proident est commodo laboris consectetur ea tempor officia."
        keywords={keywords.contact_us}
        url={`${NEXT_PUBLIC_BASE_URL}/contact`}
      />
      <Container className="py-20">
        <h1 className="text-align pb-20 text-4xl font-libre uppercase">Contact us</h1>
        <div className="grid lg:grid-cols-2 gap-10">
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
                required: 'Phone is required'
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
            {errors.content && (
              <p className="text-red-600 text-xs -mt-2">{errors.content.message}</p>
            )}
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
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3271.87912145818!2d-56.1691871843327!3d-34.909482880381354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959f814c4cec4b67%3A0x10c61042c2b15fc0!2sCo-Work%20Latam-Parque%20Rod%C3%B3!5e0!3m2!1sen!2suy!4v1675892606100!5m2!1sen!2suy"
            width="600"
            height="450"
            loading="lazy"
            className="w-full lg:h-full h-96"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </Container>
    </>
  );
};

export default Contact;
