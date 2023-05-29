import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import Button from 'app/_components/button/Button';
import { Spinner } from '~/components/globals/Spinner';

import Container from '~/layouts/Container';
import swell from '~/lib/SwellJS';
import { notifyFailure, notifySuccess } from '~/utils/toastifies';

type Inputs = {
  password: string;
  confirmPassword: string;
};

const ResetPasswordForm = () => {
  const router = useRouter();
  const [isHidden, setIsHidden] = useState(true);
  const [isConfirmHidden, setIsConfirmHidden] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<Inputs>({
    mode: 'onChange'
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const key = router.query.key;
    setIsLoading(true);
    try {
      await swell.account.recover({
        password: data.password,
        reset_key: key
      });
      notifySuccess('Your password has been changed.');
      await router.push('/account/login');
    } catch (e) {
      console.error(e);
      notifyFailure('There was an error changing your password. Please try again.');
    } finally {
      // Turn off spinner
      setIsLoading(false);
    }
  };
  // Used to check if password and confirmPassword fields are the same
  const password = useRef({});
  password.current = watch('password');

  return (
    <Container className="font-quicksand h-full flex flex-grow flex-col justify-center items-center">
      <div className="w-11/12 border p-6 my-14 rounded sm:w-9/12 md:w-6/12 md:p-8 lg:w-6/12 lg:p-12">
        <h1 className="font-semibold font-libre text-3xl mb-4">Reset your password</h1>
        <p className="block mb-10 ">Plesase enter your new password</p>
        <form
          onSubmit={(e) => {
            void handleSubmit(onSubmit)(e);
          }}
        >
          <div className="mb-8">
            <label className="font-bold text-gray-dark mb-2 block" htmlFor="password">
              NEW PASSWORD
            </label>
            <div className="mb-2 flex border rounded focus-within:outline focus-within:outline-2 focus-within:outline-secondary">
              <input
                id="password"
                type={`${isHidden ? 'password' : 'text'}`}
                placeholder="Password"
                autoComplete="off"
                className="w-full rounded rounded-r-none py-3 px-6 focus:outline-none"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Please enter a valid password'
                  }
                })}
                aria-invalid={errors.password ? 'true' : 'false'}
              />
              <button
                type="button"
                onClick={() => setIsHidden(!isHidden)}
                className="inline-flex h-fit my-auto mx-3 text-2xl text-gray-dark rounded-r"
              >
                {isHidden ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-600 text-xs mb-4">{errors.password.message}</p>
            )}
          </div>
          <div className="mb-14">
            <label className="font-bold text-gray-dark mb-2 block" htmlFor="confirmPassword">
              CONFIRM NEW PASSWORD
            </label>
            <div className="mb-2 flex border rounded focus-within:outline focus-within:outline-2 focus-within:outline-secondary">
              <input
                id="confirmPassword"
                type={`${isConfirmHidden ? 'password' : 'text'}`}
                placeholder="Repeat password"
                className="w-full rounded rounded-r-none py-3 px-6 focus:outline-none"
                {...(password.current !== undefined && {
                  ...register('confirmPassword', {
                    validate: (value) => value === password.current || 'Passwords must be the same'
                  })
                })}
              />{' '}
              <button
                type="button"
                onClick={() => setIsConfirmHidden(!isConfirmHidden)}
                className="inline-flex h-fit my-auto mx-3 text-2xl text-gray-dark rounded-r"
              >
                {isConfirmHidden ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-600 text-xs mt-2 mb-4">{errors.confirmPassword.message}</p>
            )}
          </div>
          <Button type="submit" label={!isLoading ? 'SAVE' : <Spinner size={4} />} fullWidth />
        </form>
      </div>
    </Container>
  );
};

export default ResetPasswordForm;
