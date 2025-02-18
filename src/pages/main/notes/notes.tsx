import { FC, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import Button from "../../../components/Buttons/button";
import Modal from "../../../components/Modal";
import Header from "../../../components/Header";
import { useQuery } from "react-query";
import { get } from "../../../api";
import { MoonLoader } from "react-spinners";

const Notes: FC<{}> = () => {
  const [showView, setShowView] = useState(false);

  const { data, isFetching } = useQuery(["dentistList"], () =>
    get("/dentists")
  );

  console.log(data)

  return (
    <>
      <div className="md:mt-4 md:px-12">
        <div className="px-4 sm:px-6 lg:px-8">
          <Header title="Dentists" description="A list of all the dentists.">
            <Button
              Icon={<PlusCircleIcon className="w-4" />}
              text={"Add produce"}
              type={"primary-link"}
              path={"create-dentist"}
              onClick={() => null}
              hasIcon={true}
            />
          </Header>
          {isFetching ? (
            <div className="h-[30rem] flex justify-center items-center">
              <MoonLoader
                color="#22C55E"
                loading={isFetching}
                size={50}
                aria-label="loading spinner"
              />
            </div>
          ) : (
            <>
              <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                      sdasd
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {/* View single product */}
      <>
        <Modal show={showView} setShow={setShowView}>
          {/* <ViewDentist selected={selected} /> */}ksdl
        </Modal>
      </>
    </>
  );
};

export default Notes;