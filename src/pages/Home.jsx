const Home = () => {
    return (
        <div className="w-full h-[calc(100vh-76px)] flex flex-col justify-center items-center">
            <h3 className="text-6xl font-semibold exo">Every <span className="text-red-600">story</span> has its own <span className="text-red-600">vibe</span> .</h3>
            <p className="mt-8 text-2xl pacifico text-red-500">Do you have something in your mind lets type it .</p>
            <button className="mt-6 text-xl font-extrabold border-2 border-black px-6 py-2.5 rounded-lg text-black hover:text-white hover:bg-red-600 hover:border-red-600">Let's Post</button>
        </div>
    );
}

export default Home;