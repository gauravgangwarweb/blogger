const Unauthorized = () => {
    return (
        <div className="w-full h-[calc(100vh-76px)] flex justify-center items-center flex-col">
            <h4 className="text-9xl font-extrabold">401</h4>
            <p className="mt-4 text-red-400 font-medium text-lg">Unauthorized Access</p>
        </div>
    );
}

export default Unauthorized;