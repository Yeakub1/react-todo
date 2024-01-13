import { TbFileStack } from "react-icons/tb";
import { RiTodoFill, RiWechatLine } from "react-icons/ri";
import { GrAttachment } from "react-icons/gr";
import { FaRegCalendarDays } from "react-icons/fa6";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import client from "../assets/clint.png";
import image1 from "../assets/images1.png";
import image2 from "../assets/download.png";
import image3 from "../assets/images2.png";
import useAxiousSecure from "../Hooks/useAxiousSecure";

const img_hosting_token = import.meta.env.VITE_Image_Upload_Token;
const imgHostingApi = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

const Templete = () => {
  const { register, handleSubmit, reset } = useForm();
  let [isOpen, setIsOpen] = useState(false);
  const [data, refetch] = useAxiousSecure();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", data.file[0]);

    fetch(imgHostingApi, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageResponse) => {
        if (imageResponse?.success) {
          const imgURL = imageResponse.data.display_url;
          const saveFile = {
            image: imgURL,
          };

          axios
            .post("https://task-url.vercel.app/files", saveFile)
            .then((data) => {
              if (data.data?.insertedId) {
                reset();
                refetch();
                closeModal();
              }
            });
        }
      })
      .catch((error) => {
        console.error("Error during image upload:", error);
      });
  };

  return (
    <>
      <div className="w-96 px-4 py-3 bg-white rounded-md shadow-lg">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 font-semibold">
            <div className="avatar">
              <div className="w-8 rounded-full">
                <img src={client} alt="image1" />
              </div>
            </div>
            <p>John Doe</p>
          </span>
          <span className="flex items-center gap-2 font-semibold">
            <div className="avatar">
              <div className="w-8 rounded-full">
                <img src={image1} alt="image1" />
              </div>
            </div>
            <p>Jane Smith</p>
          </span>
        </div>

        <div className="flex justify-between items-center mt-4 text-gray-600">
          <div className="flex items-center gap-1">
            <TbFileStack />
            <p>Lorem ipsum dolor sit amet, con...</p>
          </div>
          <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-lg">
            <RiTodoFill />
            <p className="font-semibold">1/2</p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 text-gray-600">
          <div className="">
            <div className="avatar">
              <div className="w-8 rounded-full">
                <img src={image2} alt="image2" />
              </div>
            </div>
            <div className="avatar">
              <div className="w-8 rounded-full">
                <img src={image3} alt="image3" />
              </div>
            </div>
          </div>
          <p className="font-semibold text-sm bg-gray-100 p-[6px] rounded-full">
            12+
          </p>
          <div className="flex items-center gap-1 text-gray-600">
            <RiWechatLine className="text-lg" />
            <p className="font-semibold text-sm">15</p>
          </div>
          <div
            onClick={openModal}
            className="flex items-center gap-1 cursor-pointer"
          >
            <GrAttachment />
            <p className="font-semibold text-sm">{data?.length}</p>
          </div>
          <div className="flex items-center gap-1">
            <FaRegCalendarDays />
            <p className="font-semibold text-sm">13-01-24</p>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Upload Image
                  </Dialog.Title>
                  <button
                    onClick={closeModal}
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 border-none"
                  >
                    ✕
                  </button>

                  <div className="mt-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <input
                        {...register("file", { required: true })}
                        type="file"
                        multiple
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      />
                      <button className="inline-flex justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-blue-900 focus:outline-none">
                        Upload
                      </button>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Templete;
