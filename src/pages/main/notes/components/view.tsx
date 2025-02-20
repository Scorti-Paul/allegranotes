import Modal from "../../../../components/Modal";
import moment from 'moment'

export default function ViewNote({
  selected,
  show,
  setShow,
}: any) {
   
  return (
    <Modal
      show={show}
      setShow={setShow}
      modalTitle=""
      modalDesc=""
      size={2}
    >
      <div className="flex h-full">
        <div className="flex min-w-0 flex-1 flex-col ">
          <div className="relative z-0 mt-1">
            <h2 className="text-2xl font-medium text-gray-700 mt-4">
              {selected.title}
            </h2>
            <div className="">
              <span className="text-indigo-900  block mb-3">
                <strong className="text-indigo-400">Last Updated: </strong>
                {moment(selected.updatedAt).format("MMM DD, YYYY")}
              </span>
              {
                selected?.category?.name && <>
                  <span className="bg-blue-200 text-blue-500 inline-block font-medium px-2 py-1 text-xs rounded-md">{selected?.category?.name}</span>
                </>
              }              
            </div>
            <p className="mt-5 mb-3 leading-6">
              {selected.content}
            </p>
            {
              selected?.tag?.name && <>
                <span className="text-indigo-400 font-medium px-2 py-1 text-xs rounded-md"># {selected?.tag?.name}</span>
              </>
            }
          </div>
        </div>
      </div>
    </Modal>
  );
}