'use client';

import Button from '../../../components/Button';
import { useRouter } from 'next/navigation';
import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, RefObject, useEffect, useRef, useState } from 'react';
import { updateName } from '../(actions)/actions';
import { GrFormNextLink } from 'react-icons/gr'
import plans from "../../../constants/plans";
import PriceCard from '../../pricing/(components)/PriceCard';
import React from 'react';

export default function Form() {
  // const [name, setName] = useState('');
  const [isBeginner, setBeginner] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const {
    nextStep,
    isLastStep,
    gotoForm,
    isFirstStep,
    isSuccess,
    currentStepIndex,
    previousStep,
    status,
  } = useMultistepForm(4);



  // async function validateAndUpdate() {
  //   if (isValidString(name)) {
  //     await updateName(name);
  //     router.push('/dashboard');
  //   } else {
  //     setError(
  //       'Your name must only contain letters and numbers, and be at most 32 characters with no spaces.'
  //     );
  //   }
  // }

  function isValidString(input: any) {
    const regex = /^[a-zA-Z0-9]{1,32}$/;
    return regex.test(input);
  }
  
  const InitialValues = {
    planSelected: "arcade",
    yearly: false,
    addOns: [
      {
        id: 1,
        checked: true,
        title: "Online Service",
        subtitle: "Access to multiple games",
        price: 1,
      },
      {
        id: 2,
        checked: false,
        title: "Large storage",
        subtitle: "Extra 1TB of cloud save",
        price: 2,
      },
      {
        id: 3,
        checked: false,
        title: "Customizable Profile",
        subtitle: "Custom theme on your profile",
        price: 2,
      },
    ],
  };

  const phoneRegExp = /^(\+\s?)?(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/

  const [formData, setFormData] = useState(InitialValues);

  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const phone = useRef<HTMLInputElement>(null);

  const nameErr = useRef<HTMLSpanElement>(null);
  const emailErr = useRef<HTMLSpanElement>(null);
  const phoneErr = useRef<HTMLSpanElement>(null);

  const validateUserForm = (data: any) => {
    const parsedValues = data;
    if (!parsedValues.success) {
      const formatted = parsedValues.error.format();
      if (nameErr?.current !== null) {
        nameErr.current.textContent =
          formatted.userName?._errors?.toString() || "";
      }
      if (emailErr?.current !== null) {
        emailErr.current.textContent =
          formatted.userEmail?._errors?.toString() || "";
      }
      if (phoneErr?.current !== null) {
        phoneErr.current.textContent =
          formatted.userPhone?._errors?.toString() || "";
      }
      return formatted;
    }

    return parsedValues.data;
  };

  const updateFormData = (updateField: Partial<any>) => {
    setFormData({ ...formData, ...updateField });
  };

  const handleFormData = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // const addUserInfo = validateUserForm({
    //   userName: name.current?.value || "",
    //   userEmail: email.current?.value || "",
    //   userPhone: phone.current?.value || "",
    // });

    const addUserInfo = {
      userName: "test",
      userEmail: "test@test.com",
      userPhone: "+123-456-7890",
    };


    if (
      currentStepIndex === 0 &&
      typeof addUserInfo.userName === "string" &&
      typeof addUserInfo.userEmail === "string" &&
      typeof addUserInfo.userPhone === "string"
    ) {
      nextStep();
    } else if (currentStepIndex > 0) {
      nextStep();
    }
  };
  console.log(currentStepIndex);

  return (
    <>
     <main className="h-screen md:grid md:place-items-center md:bg-lighter-blue">
      <div
        className="min-h-screen w-full overflow-hidden bg-magnolia md:mx-auto md:flex md:h-auto md:min-h-[515px] md:w-[768px] md:max-w-[1024px] md:rounded-2xl md:bg-white md:p-2 lg:w-auto"
        style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
      >
        <Sidebar currentStepIndex={currentStepIndex} />
        <div className="-mt-[85px] px-4 pb-10 md:-mt-[0px] md:pb-0">
          <section className="overflow-hidden rounded-xl bg-white px-6 py-8 md:h-[500px] md:px-6 lg:w-[550px] lg:px-14">
            {isSuccess ? (
              // <AnimatePresence mode="wait">
              <h1>Success</h1>
                // <Success gotoForm={gotoForm} />
              // </AnimatePresence>
            ) : (
              <form onSubmit={(e) => handleFormData(e)}>
                {/* <AnimatePresence mode="wait" custom={status}> */}
                  {currentStepIndex === 0 && (
                    <PersonalInfo
                      key={"step1"}
                      status={status}
                      name={name}
                      email={email}
                      phone={phone}
                      nameErr={nameErr}
                      emailErr={emailErr}
                      phoneErr={phoneErr}
                    />
                  )}
                  {currentStepIndex === 1 && (
                    // <BillingPlan
                    //   key={"step2"}
                    //   status={status}
                    //   {...formData}
                    //   updateForm={updateFormData}
                    // />
                    <>
                      <h1 className="mb-2 text-[26px] font-bold text-marine-blue ">
                        Prompt Engineering
                      </h1>
                      <p className="mb-6 text-lg text-cool-gray">
                        Do you have any experience with Prompt Engineering? What level would you say?
                      </p>
                      <div className="mx-8 shadow rounded-full h-10 mt-4 flex p-1 relative items-center">
                          <div className="w-full flex justify-center">
                              <button>Beginner</button>
                          </div>
                          <div className="w-full flex justify-center">
                              <button>Advanced</button>
                          </div>
                          <span 
                          className="elSwitch bg-indigo-600 shadow text-white flex items-center justify-center w-1/2 rounded-full h-8 transition-all top-[4px] absolute left-1 ">
                          Beginner
                          </span>
                      </div>
                    </>
                  )}
                  {currentStepIndex === 2 && (
                    <>
                      <h1 className="mb-2 text-[26px] font-bold text-marine-blue ">
                        You are on the free plan.
                      </h1>
                      <p className="mb-6 text-lg text-cool-gray">
                        To ensure you get all the benefits of our AI try our premium tier. 
                      </p>
                      <>
                        <button
                          type="button"
                          className="font-semibold text-cool-gray"
                          onClick={previousStep}
                        >
                          {isFirstStep ? "" : "Go Back"}
                        </button>
                        <button
                          type="submit"
                          className="grid h-[45px] min-w-[110px] place-items-center rounded bg-marine-blue font-semibold text-black"
                        >
                          {isLastStep ? "Confirm" : "Next Step"}
                        </button>
                      </>
                        <div className='m-auto w-full rounded-xl'>
                          <StripePricingTable />
                      </div>
                    </>
                    // <Addons
                    //   key={"step3"}
                    //   status={status}
                    //   {...formData}
                    //   updateForm={updateFormData}
                    // />
                  )}
                  {currentStepIndex === 3 && (
                    <Review
                      gotoForm={gotoForm}
                      key={"step4"}
                      status={status}
                      {...formData}
                    />
                  )}
                {/* </AnimatePresence> */}
                <div className="mt-10 flex items-center justify-between">
                  {isSuccess ? (
                    ""
                  ) : (
                    <>
                      <button
                        type="button"
                        className="font-semibold text-cool-gray"
                        onClick={previousStep}
                      >
                        {isFirstStep ? "" : "Go Back"}
                      </button>
                      <button
                        type="submit"
                        className="grid h-[45px] min-w-[110px] place-items-center rounded bg-marine-blue font-semibold text-black"
                      >
                        {isLastStep ? "Confirm" : "Next Step"}
                      </button>
                    </>
                  )}
                </div>
              </form>
            )}
          </section>
        </div>
      </div>
    </main>
      <div className='flex flex-col'>
        <p className='text-accent-foreground pb-2 text-sm'>Name</p>
        <div className='flex flex-col'>
          <input
            // value={name}
            className='max-w-xs'
            // onChange={(e: any) => setName(e.target.value)}
            placeholder='Roman'
          />
          {error.length > 0 && (
            <p className='mt-1 text-sm text-rose-500'>{error}</p>
          )}
        </div>
      </div>
      <div className='flex justify-between'>

        <Button 
        variant={"black"}
        text={"Continue"}
        icon={<GrFormNextLink color='white'/>}
        // onClick={() => validateAndUpdate()} size={'sm'}
          Continue
        />
      </div>
    </>
  );
}

const useMultistepForm = (step: number) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [status, setStatus] = useState("");

  const nextStep = () => {
    if (currentStepIndex < step - 1) {
      setCurrentStepIndex((i) => i + 1);
      setStatus("ascending");
    }
    if (currentStepIndex === 3) {
      setIsSuccess(true);
    }
  };

  const previousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((i) => i - 1);
      setStatus("descending");
    }
  };

  const gotoForm = (index: number) => {
    setCurrentStepIndex(index);
    setIsSuccess(false);
    setStatus("descending");
  };

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === step - 1;

  return {
    currentStepIndex,
    nextStep,
    previousStep,
    gotoForm,
    isFirstStep,
    isLastStep,
    isSuccess,
    status,
  };
};

type NavTypes = {
  currentStepIndex: number;
  gotoForm?: (index: number) => void;
};

const Sidebar = ({ currentStepIndex }: NavTypes) => {
  return (
    <header className="h-[200px] bg-bg-mobile bg-cover bg-center md:h-auto md:rounded-xl md:bg-bg-desktop md:px-8 ">
      <div className="flex h-full w-full justify-center space-x-6 pt-10  md:w-[220px] md:flex-col md:justify-start md:space-x-0 md:space-y-8">
        {["Your Info", "Select Plan", "Add-on", "summary"].map((btn, i) => {
          let position;
          if (i === currentStepIndex) {
            position = "active";
          }

          return (
            <div className="md:flex md:items-center" key={btn}>
              <button
                className={`${position} flex h-[40px] w-[40px] items-center justify-center rounded-full border border-white text-white transition-all md:mr-5`}
              >
                {i + 1}
              </button>
              <div className="hidden md:block">
                <p className="text-sm font-light uppercase text-light-gray">
                  step {i + 1}
                </p>
                <p className="text-base font-medium uppercase text-white">
                  {btn}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </header>
  );
};

type formDataProps = {
  status: string;
  name: RefObject<HTMLInputElement>;
  email: RefObject<HTMLInputElement>;
  phone: RefObject<HTMLInputElement>;
  nameErr: RefObject<HTMLSpanElement>;
  emailErr: RefObject<HTMLSpanElement>;
  phoneErr: RefObject<HTMLSpanElement>;
};

const PersonalInfo = ({
  status,
  name,
  email,
  phone,
  nameErr,
  emailErr,
  phoneErr,
}: formDataProps) => {

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <h1 className="mb-2 text-[26px] font-bold text-marine-blue ">
        Personal Info
      </h1>
      <p className="mb-6 text-lg text-cool-gray">
        Please provide your name, email address, phone number.
      </p>
      <div className="">
        <div className="relative mb-4 md:mb-5">
          <label htmlFor="name" className=" block font-medium text-marine-blue">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="e.g Stephen King"
            ref={name}
            required
            className="h-[45px] w-full rounded border-2 border-light-gray px-3 outline-none placeholder:font-medium"
          />
          <span
            ref={nameErr}
            className=" text-red-600 md:absolute md:-bottom-6 md:left-0"
          ></span>
        </div>
        <div className="relative mb-4 md:mb-5">
          <label
            htmlFor="email"
            className=" block font-medium text-marine-blue"
          >
            Email Address
          </label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="e.g stephenking@lorem.com"
            ref={email}
            required
            className="h-[45px] w-full rounded border-2 border-light-gray px-3 outline-none placeholder:font-medium"
          />
          <span
            ref={emailErr}
            className=" text-red-600 md:absolute md:-bottom-6 md:left-0"
          ></span>
        </div>
        <div className="relative">
          <label
            htmlFor="phone_num"
            className=" block font-medium text-marine-blue"
          >
            Phone Number
          </label>
          <input
            type="text"
            name="tel"
            id="phone"
            ref={phone}
            required
            placeholder="e.g +123-4567-879"
            className="h-[45px] w-full rounded border-2 border-light-gray px-3 outline-none placeholder:font-medium"
          />
          <span
            ref={phoneErr}
            className=" text-red-600 md:absolute md:-bottom-6 md:left-0"
          ></span>
        </div>
      </div>
    </>
  );
};

type updateWithAddons = any & {
  updateForm: (updateField: Partial<any>) => void;
  status: string;
};

const Addons = ({ status, addOns, yearly, updateForm }: updateWithAddons) => {

  const handleCheckChange = (id: number, checked: boolean) => {
    const updateAddons = addOns.map((addon: { id: number; }) => {
      if (addon.id === id) {
        return { ...addon, checked };
      } else {
        return addon;
      }
    });

    updateForm({ addOns: updateAddons });
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <h1 className="mb-2 text-[26px] font-bold text-marine-blue ">
        Pick add-ons
      </h1>
      <p className="mb-6 text-lg text-cool-gray">
        Add-ons help enhance your gaming experience.
      </p>

      {addOns.map((addon: { id: any; checked: any; title: any; subtitle: any; price: number; }) => {
        return (
          <div
            key={addon.id}
            className={`${
              addon.checked
                ? "border-marine-blue bg-magnolia"
                : "border-light-gray"
            } mb-3 flex items-center justify-between rounded-lg border-2  px-3 py-4`}
          >
            <div className="flex items-center">
              <input
                className="mr-3"
                id={addon.title}
                checked={addon.checked}
                // onCheckedChange={(checked) =>
                //   handleCheckChange(addon.id, checked as boolean)
                // }
              />
              <div className="">
                <label
                  htmlFor={addon.title}
                  className="block text-base font-medium leading-[.8] text-marine-blue"
                >
                  {addon.title}
                  <span className="mt-2 block text-[12px] text-cool-gray">
                    {addon.subtitle}
                  </span>
                </label>
              </div>
            </div>
            <span className="text-sm font-medium text-purplish-blue">
              {yearly ? `$${addon.price * 10}/yr` : `$${addon.price}/mo`}
            </span>
          </div>
        );
      })}
    </>
  );
};

type reviewBillingProps = any & {
  gotoForm: (index: number) => void;
  status: string;
};

const Review = ({
  status,
  gotoForm,
  planSelected,
  yearly,
  addOns,
}: reviewBillingProps) => {
  console.log(planSelected);

  let plan = 0;
  let totalAddons = 0;

  if (planSelected === "arcade") {
    plan = 9;
  }
  if (planSelected === "advanced") {
    plan = 12;
  }
  if (planSelected === "pro") {
    plan = 15;
  }

  const isAddon = addOns.filter((addon: { checked: boolean; }) => addon.checked === true);

  isAddon?.forEach((addon: { price: number; }) => {
    return (totalAddons += addon.price);
  });

  const planSelectedPrice = yearly ? plan * 10 : plan;
  const planSelectedPriceWithDuration = yearly
    ? `${plan * 10}/yr`
    : `${plan}/mo`;
  const totalAddonsPrice = yearly ? totalAddons * 10 : totalAddons;

  return (
    <>
      {" "}
      <h1 className="mb-2 text-[26px] font-bold text-marine-blue ">
        Reviewing Up
      </h1>
      <p className="mb-6 text-lg text-cool-gray">
        Double check everything looks OK before confirming
      </p>
      <div className="mb-6 rounded-lg bg-slate-100 p-3">
        <div
          className={`${
            isAddon.length > 0 ? "border-b-1 border-b border-light-gray" : ""
          } mb-3 flex items-center justify-between border-b  pb-3`}
        >
          <div>
            <p className="font-semibold capitalize text-marine-blue">{`${planSelected} (${
              yearly ? "Yearly" : "Monthly"
            })`}</p>
            <button
              type="button"
              className="text-cool-gray underline"
              onClick={() => gotoForm(1)}
            >
              change
            </button>
          </div>
          <span className="font-semibold text-marine-blue">
            ${planSelectedPriceWithDuration}
          </span>
        </div>

        <div className="">
          {isAddon?.map((addon: { id: any; title: any; price: number; }) => {
            return (
              <div
                key={addon.id}
                className="item-center mb-2 flex justify-between"
              >
                <p className="capitalize text-cool-gray">{addon.title}</p>
                <span className="text-marine-blue">
                  {yearly ? `$${addon.price * 10}/yr` : `$${addon.price}/mo`}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex items-center justify-between px-3">
        <p className="capitalize text-cool-gray">
          Total ({yearly ? "per year" : "per month"}){" "}
        </p>
        <span className="font-medium text-purplish-blue">
          ${totalAddonsPrice + planSelectedPrice}
          {yearly ? "/year" : "/mo"}
        </span>
      </div>
    </>
  );
};

const StripePricingTable = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/pricing-table.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return React.createElement('stripe-pricing-table', {
    'pricing-table-id': 'prctbl_1NbGybDscgyTUUyYgOf0pxhw',
    'publishable-key':
      'pk_test_51LeTehDscgyTUUyYsD6aOjZD7zyJoj1OMLkKbFjsOEGoMUc6JPDlFzr09nip4sm39iirRllIL45RuqDChIlQ349p00loAcHNlo',
  });
};
