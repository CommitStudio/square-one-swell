import { Disclosure, Transition } from '@headlessui/react';
import Image from 'next/image';

interface Props {
  question: string;
  answer: string;
}

function FaqSingleQuestion({ question, answer }: Props) {
  return (
    <>
      <Disclosure>
        {({ open }) => (
          <>
            <hr className="bg-gray h-px border-none mt-[1.625rem] mb-8" />
            <Disclosure.Button>
              <div className="flex justify-between items-start">
                <h3 className="text-left text-black">{question}</h3>
                <div
                  id="chevron"
                  className={`min-w-[1.313rem] ml-3 pt-1 transition-all duration-200 ${
                    open ? 'rotate-180' : ''
                  }`}
                >
                  <Image width={13} height={13} src="/img/faq_chevron.svg" alt="Arrow" />
                </div>
              </div>
            </Disclosure.Button>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel>
                <p className="font-light text-black mt-7 mr-6">{answer}</p>
              </Disclosure.Panel>
            </Transition>
            <hr className="bg-gray hidden last-of-type:block h-px border-none mt-[1.625rem]" />
          </>
        )}
      </Disclosure>
    </>
  );
}

export default FaqSingleQuestion;
