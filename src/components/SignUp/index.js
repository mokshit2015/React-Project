import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import InputField from "../../common/InputField";
import { toast } from "react-toastify";
import img from "../../images/login.svg";
import {
  getDataFromStorage,
  getRandomNum,
  saveDataToStorage,
} from "../../utils";

const SignUp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("event_login")) {
      navigate("/home");
    }
  }, [navigate]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});

  const login = () => {
    navigate("/login");
  };

  const onSubmit = async (data) => {
    const users = await getDataFromStorage("event_userDetails");
    if (users && users.length > 0) {
      const email = data.email;
      const findEmail = users.find((user) => user.email === email);
      if (findEmail) {
        toast.error("Email Already Exist");
      } else {
        const obj = [
          ...users,
          {
            userId: data.userName.slice(0, 2) + "_" + getRandomNum(),
            ...data,
          },
        ];
        saveDataToStorage("event_userDetails", obj);
        reset();
        toast.success("User Created");
        navigate("/login");
      }
    } else {
      const obj = [
        {
          userId: data.userName.slice(0, 2) + "_" + getRandomNum(),
          ...data,
        },
      ];
      saveDataToStorage("event_userDetails", obj);
      reset();
      toast.success("User Created");
      navigate("/login");
    }
  };

  return (
    <>
      <section className="h-full lg:my-20">
        <div className="container h-full px-6 py-24 xs:px-2">
          <div className="lg-6 flex h-full flex-wrap items-center justify-enter lg:justify-evenly xs:pl-20">
            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xs:w-12/12">
              <img src={img} className="w-80" alt="Login" />
            </div>
            <div className="md:w-8/12 lg:ml-6 lg:w-5/12 mt-10">
              <div className="flex justify-center text-primary-600 w-full text-4xl mb-5 font-extrabold text-muted">
                Sign Up
              </div>
              <form>
                <div className="relative mb-6">
                  <InputField
                    fieldName="email"
                    validationObj={{
                      required: "Please Enter Email",
                      validate: {
                        matchPattern: (e) =>
                          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                            e
                          ) || "Email address must be a valid address",
                      },
                    }}
                    register={register}
                    errors={errors}
                    fieldType="text"
                    className="min-h-[auto] w-full rounded border-2 bg-light py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200"
                    placeholder="Enter Email Here..."
                  />
                  <InputField
                    fieldName="userName"
                    validationObj={{
                      required: "Please Enter Username",
                    }}
                    register={register}
                    errors={errors}
                    fieldType="text"
                    className="min-h-[auto] w-full rounded border-2 bg-light py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200"
                    placeholder="Enter Username Here..."
                  />
                  <InputField
                    fieldName="password"
                    validationObj={{
                      required: "Please Enter Password",
                      validate: {
                        matchPattern: (e) =>
                          /^(?=.*?[A-Z])(?=.*?[#?!@$%^&*-]).{8,}$/.test(e) ||
                          "Password should contain minimum 8 characters with at least one Uppercase letter and one special character",
                      },
                    }}
                    register={register}
                    errors={errors}
                    fieldType="password"
                    className="min-h-[auto] w-full rounded border-2 bg-light py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200"
                    placeholder="Enter Password Here...."
                  />
                </div>

                <div className="w-100 flex flex-row items-center justify-center pb-3">
                  <button
                    type="submit"
                    className="inline-block rounded bg-primary px-7 pt-3 pb-2.5 text-sm font-bold uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    onClick={handleSubmit(onSubmit)}
                  >
                    Sign Up
                  </button>
                </div>

                <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                  <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                    OR
                  </p>
                </div>
              </form>

              <div className="flex items-center justify-center pb-6">
                <p className="mb-0 mr-2">Already a User ? </p>
              </div>
              <div className="flex items-center justify-center ">
                <button
                  type="button"
                  className="inline-block rounded border-2 border-primary px-6 pt-2 pb-[6px] text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  onClick={login}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
