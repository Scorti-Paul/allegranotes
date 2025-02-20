import { PlusIcon } from "@heroicons/react/24/outline";

interface Props {
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

function AddButton({ onClick }: Props) {
  return (
    <div className="transition-all ease-in-out delay-150 duration-700">
      <button
        onClick={onClick}
        className={`transition-all ease-in-out delay-150 duration-500 w-12 h-12 flex justify-center items-center bg-indigo-500 text-white rounded-full`}
      >
        <span>
          <PlusIcon className="w-6 text-white rounded-full" />
        </span>
      </button>
    </div>
  );
}

export default AddButton;