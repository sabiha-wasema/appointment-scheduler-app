import "./Loading.css"

const Loading = () => {
    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <div className="spinner"></div>
            <p className="mt-5 text-lg text-gray-600">loading, Please wait...</p>
        </div>
    );
};

export default Loading;