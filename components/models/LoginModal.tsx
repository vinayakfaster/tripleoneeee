"use client";

import useLoginModel from "@/hook/useLoginModal";
import useRegisterModal from "@/hook/useRegisterModal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiFillFacebook } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

import Button from "../Button";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Modal from "./Modal";

type Props = {};

function LoginModal({}: Props) {
  const router = useRouter();
  const registerModel = useRegisterModal();
  const loginModel = useLoginModel();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success("Login Successfully");
        router.refresh();
        loginModel.onClose();
      } else if (callback?.error) {
        toast.error("Something Went Wrong");
      }
    });
  };

  const toggle = useCallback(() => {
    loginModel.onClose();
    registerModel.onOpen();
  }, [loginModel, registerModel]);

const bodyContent = (
  <div className="flex flex-col gap-5">
    <Heading
      title="Welcome Back"
      subtitle="Login to your account"
      center
    />

    <input
      type="email"
      placeholder="Email"
      disabled={isLoading}
      {...register("email", { required: true })}
      className="
        w-full p-3 rounded-xl
        bg-white/5 border border-white/10
        text-white placeholder:text-gray-400
        focus:outline-none focus:border-white/30
      "
    />

    <input
      type="password"
      placeholder="Password"
      disabled={isLoading}
      {...register("password", { required: true })}
      className="
        w-full p-3 rounded-xl
        bg-white/5 border border-white/10
        text-white placeholder:text-gray-400
        focus:outline-none focus:border-white/30
      "
    />
  </div>
);

const footerContent = (
  <div className="flex flex-col gap-4 mt-2">

    <div className="flex items-center gap-3 text-gray-500 text-xs">
      <div className="flex-1 h-[1px] bg-white/10" />
      OR CONTINUE WITH
      <div className="flex-1 h-[1px] bg-white/10" />
    </div>

    <button
      onClick={() => signIn("google")}
      className="flex items-center justify-center gap-3 w-full py-3 rounded-xl bg-white text-black font-medium hover:opacity-90 transition"
    >
      <FcGoogle size={20} />
      Continue with Google
    </button>

    <button
      onClick={() => signIn("facebook")}
      className="flex items-center justify-center gap-3 w-full py-3 rounded-xl bg-[#1877F2] text-white font-medium hover:opacity-90 transition"
    >
      <AiFillFacebook size={20} />
      Continue with Facebook
    </button>

    <p className="text-center text-sm text-gray-400">
      Don’t have an account?{" "}
      <span
        onClick={toggle}
        className="text-[#b89b72] cursor-pointer hover:underline"
      >
        Sign up
      </span>
    </p>
  </div>
);
  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModel.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModel.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default LoginModal;
