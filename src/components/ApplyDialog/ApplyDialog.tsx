import { Transition, Dialog } from "@headlessui/react";
import moment from "moment";
import { Fragment, useState } from "react";
import Button from "../../elements/Button/Button";
import Input from "../../elements/Input/Input";

export const ApplyDialog = (props: any) => {
  let [isOpen] = useState(true);
  const [applyReason, setApplyReason] = useState('')

  const applyData = {
    ...props.appartmentData,
    reason: applyReason,
    applyDate: moment().format()
  }
  return (
    <div className="bg-red-500 h-screen w-screen">
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={() => props.closeModal(false)}>
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                Why I'm a good tenant for this apartment
              </Dialog.Title>
              <div className="mt-2">
                <Input label="" onChange={(e) => setApplyReason(e.target.value)}/>
              </div>
              <div className="mt-4">
                <Button label="Apply" isHalf={true} onClick={() => props.applyConfirm(applyData)} className="mt-2 mr-2" />
                <Button label="Cancel" isHalf={true} onClick={() => props.closeModal(false)} className="mt-2" />
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
    </div>
  );
};
