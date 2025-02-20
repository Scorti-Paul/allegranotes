import { HeaderProps } from './types.d'

export default function Header({ title, description, children }: HeaderProps) {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
          <p className=" text-sm text-[#6E7D94]">{description}</p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">{children}</div>
      </div>
    </>
  )
}