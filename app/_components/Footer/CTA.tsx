import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Button from '~/_components/Button';

import Container from '~/_layouts/Container';

type Inputs = {
  newsletterUserEmail: string;
};

const CTA = () => {
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
    setValue('newsletterUserEmail', '');

    setIsThanksMessage(true);

    setTimeout(() => {
      setIsThanksMessage(false);
    }, 3000);
  };

  return (
    <div className="w-full bg-white text-black space-y-3 md:space-y-0 md:flex-row justify-around items-center">
      <Container className="w-full flex flex-col gap-6 md:flex-row justify-between items-center py-12">
        <div className="leading-6">
          <p className="font-bold">Sign up for our Newsletter</p>
          <span>Get top deals, latest trends, and more.</span>
        </div>
        <span className="relative">
          <form
            onSubmit={(e) => {
              void handleSubmit(onSubmit)(e);
            }}
            className="flex"
          >
            <input
              type="email"
              className="w-full border focus:outline-0 md:w-[350px] border-black border-r-0 rounded-l-lg p-2 pl-4"
              placeholder="Your email"
              {...register('newsletterUserEmail', {
                required: 'Email address is required'
              })}
            />

            <Button type="submit" label="SUBSCRIBE" color="black" classes="rounded-r-lg" />
          </form>
          {errors.newsletterUserEmail && (
            <p className="text-red-600 text-xs absolute -bottom-5">
              {errors.newsletterUserEmail.message}
            </p>
          )}
          <p className={`${isThanksMessage ? 'text-green text-xs absolute -bottom-5' : 'hidden'}`}>
            Thanks for subscribing!
          </p>
        </span>
      </Container>
    </div>
  );
};

export default CTA;
