import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { Props } from "./types";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function Modal({
  show,
  setShow,
  modalTitle,
  modalDesc,
  children,
  size,
}: Props) {
  const cancelButtonRef = useRef(null);

  return (
    <>
      <Transition.Root show={show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setShow}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <div className={!size ? `w-full mx-auto md:max-w-4xl` : `w-full mx-auto md:max-w-${size}xl`}>
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:p-6 md:max-w-xl md:mx-auto">
                    <div className="">
                      <div className="flex justify-between relative ">
                        <div>
                          <Dialog.Title
                            as="h3"
                            className="text-xl font-medium leading-6 text-gray-900"
                          >
                            {modalTitle}
                          </Dialog.Title>
                          <Dialog.Description
                            as="div"
                            className="mt-2 text-xs text-gray-400"
                          >
                            {modalDesc}
                          </Dialog.Description>
                        </div>
                        <button
                          className="absolute right-0"
                          onClick={() => setShow(false)}
                        >
                          <XMarkIcon className="h-6 text-gray-500" />
                        </button>
                      </div>
                      <div className="mt-2">
                        <div className="text-sm text-gray-500">{children}</div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}