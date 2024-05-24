'use client';

import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import { Heading } from '../Heading';
import { Input } from '../inputs/Input';
import { Button } from '../Button';
import { signIn } from 'next-auth/react';
import useLoginModal from '@/app/hooks/useLoginModal';

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    await axios
      .post('/api/register', data)
      .then((res) => {
        toast.success('Account created! Please login.');
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((err) => {
        toast.error('Something went wrong, please try again later.');
      })
      .finally(() => setIsLoading(false));

    // * alternative with try catch
    // try {
    //   await axios.post('/api/auth/register', data);
    //   registerModal.onClose();
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const toggleModal = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account!" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div className="mt-4 font-light text-center text-neutral-500">
        <div className="flex flex-row items-center justify-center gap-2">
          <div>Already have an account?</div>
          <div
            className="cursor-pointer text-neutral-800 hover:underline"
            onClick={toggleModal}
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
