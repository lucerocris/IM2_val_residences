import TitleCard from "./title-card";


const NoApplication = () => {
    return(
        <>
            <div className="w-full max-w-4xl mx-auto p-6">
                <TitleCard />
                <div className="bg-gray-100 p-8 rounded-b-lg text-center">
                    <p className="text-gray-600">No applications found</p>
                </div>
            </div>
        </>
    );
}

export default NoApplication;