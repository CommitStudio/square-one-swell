import Link from 'next/link';

import { useForm, SubmitHandler } from 'react-hook-form';

import Container from '~/layouts/Container';

type Inputs = {
  email: string;
  password: string;
};

const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <Container className="h-full flex flex-grow flex-col justify-center items-center">
      <div className="w-11/12 pt-6 pb-24 sm:w-9/12 md:pt-24 md:w-6/12 lg:w-4/12">
        <h1 className="font-bold text-3xl pb-6 mb-4">Forgot your password?</h1>
        <p className="text-sm pb-6 mb-4">
          Enter your email address and we’ll send you an email on how to reset your password.
        </p>
        <form
          onSubmit={(e) => {
            void handleSubmit(onSubmit)(e);
          }}
        >
          <div className="pb-6">
            <div className="mb-2">
              <label className="font-bold text-xs text-gray-500 mb-2 block">E-MAIL</label>
              <input
                type="email"
                placeholder=""
                autoComplete="off"
                className="w-full border rounded py-3 px-6 focus:outline-secondary"
                {...register('email', {
                  required: 'Email address is required',
                  pattern: {
                    value: /^.{1,}[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Please enter a valid email address'
                  }
                })}
                aria-invalid={errors.email ? 'true' : 'false'}
              />
              {errors.email ? (
                <>
                  {errors.email.type === 'required' && (
                    <p role="alert" className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                  {errors.email.type === 'pattern' && (
                    <p role="alert" className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </>
              ) : null}
            </div>
          </div>
          <div className="mb-4">
            <button
              type="submit"
              aria-label=""
              className="w-full bg-secondary text-white text-xs font-bold rounded py-3 px-6 transition-all duration-300 hover:text-primary"
            >
              SEND EMAIL
            </button>
            <Link href="/account/login">
              <a className="block w-full bg-gray-200 text-black text-xs text-center font-bold rounded py-3 px-6 mt-4 transition-all duration-300 hover:text-secondary hover:bg-primary">
                BACK TO LOG IN
              </a>
            </Link>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default ForgotPasswordForm;