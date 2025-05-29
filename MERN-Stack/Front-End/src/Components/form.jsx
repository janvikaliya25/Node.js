
function Form({ handleChange, handleSubmit, state }) {
    return (
        <div className="flex flex-col items-center p-6 w-full">
            <h1 className="text-3xl font-bold text-[#333] mb-6">Information Form</h1>

            <div className="w-full max-w-md bg-white/30 backdrop-blur-md shadow-xl p-6 rounded-lg">
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <input
                        type="text"
                        name="name"
                        value={state.name}
                        onChange={handleChange}
                        placeholder="Enter name"
                        className="w-full p-3 rounded-lg border border-gray-300 focus:border-[#FFC1CC] focus:ring-2 focus:ring-[#FFC1CC] outline-none transition-all duration-300 shadow-sm"
                    />

                    <input
                        type="text"
                        name="city"
                        value={state.city}
                        onChange={handleChange}
                        placeholder="Enter city"
                        className="w-full p-3 rounded-lg border border-gray-300 focus:border-[#FFC1CC] focus:ring-2 focus:ring-[#FFC1CC] outline-none transition-all duration-300 shadow-sm"
                    />

                    <button
                        type="submit"
                        className="w-full py-3 mt-3 text-lg font-semibold text-white bg-[#FFC1CC] rounded-lg shadow-md transition-all duration-300 hover:bg-[#E6A6A6] hover:shadow-xl"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Form;