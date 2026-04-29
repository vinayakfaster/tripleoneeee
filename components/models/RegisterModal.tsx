"use client";

import useLoginModel from "@/hook/useLoginModal";
import useRegisterModal from "@/hook/useRegisterModal";
import axios from "axios";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiFillFacebook } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

import { signIn } from "next-auth/react";
import Button from "../Button";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Modal from "./Modal";

type Props = {};

function RegisterModal({}: Props) {
  const registerModel = useRegisterModal();
  const loginModel = useLoginModel();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Success!");
        loginModel.onOpen();
        registerModel.onClose();
      })
      .catch((err: any) => toast.error("Something Went Wrong"))
      .finally(() => {
        setIsLoading(false);
        toast.success("Register Successfully");
      });
  };

  const toggle = useCallback(() => {
    loginModel.onOpen();
    registerModel.onClose();
  }, [loginModel, registerModel]);

 const bodyContent = (
  <div className="flex flex-col gap-6">

    <div className="text-center space-y-2">
      <h2 className="text-3xl font-serif text-[#1a1a1a]">
        Join TripleOne
      </h2>
      <p className="text-sm text-neutral-500">
        Create your account & unlock luxury stays
      </p>
    </div>

    {/* INPUTS */}
    <div className="flex flex-col gap-4">

      <div className="relative">
        <Input
          id="email"
          label="Email Address"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>

      <div className="relative">
        <Input
          id="name"
          label="Full Name"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>

      <div className="relative">
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

    </div>
  </div>
);
 const footerContent = (
  <div className="flex flex-col gap-5 mt-4">

    {/* Divider */}
    <div className="flex items-center gap-3">
      <div className="flex-1 h-[1px] bg-neutral-200" />
      <span className="text-xs tracking-widest text-neutral-400">
        OR CONTINUE WITH
      </span>
      <div className="flex-1 h-[1px] bg-neutral-200" />
    </div>

    {/* Google */}
    <button
      onClick={() => signIn("google")}
      className="flex items-center justify-center gap-3 w-full py-3 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 transition shadow-sm"
    >
      <FcGoogle size={20} />
      <span className="text-sm font-medium text-neutral-700">
        Continue with Google
      </span>
    </button>

    {/* Facebook */}
    <button
      onClick={() => signIn("facebook")}
      className="flex items-center justify-center gap-3 w-full py-3 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 transition shadow-sm"
    >
      <AiFillFacebook size={20} className="text-blue-600" />
      <span className="text-sm font-medium text-neutral-700">
        Continue with Facebook
      </span>
    </button>

    {/* Login switch */}
    <p className="text-center text-sm text-neutral-500 mt-3">
      Already have an account?{" "}
      <span
        onClick={toggle}
        className="text-[#b89b72] cursor-pointer hover:underline font-medium"
      >
        Log in
      </span>
    </p>
  </div>
);

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModel.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModel.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default RegisterModal;
