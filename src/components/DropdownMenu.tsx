

const DropdownMenu: React.FC<{ buttons: any }> = ({ buttons }) => {
    return (
        <div className="dropdown-menu absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2 w-48 hidden">
            {buttons.map((button: any, index: any) => (
                <button onClick={button.action} key={index} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white">
                    {button.name}
                </button>
            ))}
        </div>
    )
}
export default DropdownMenu;