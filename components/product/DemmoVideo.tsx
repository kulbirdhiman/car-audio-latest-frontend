import React from "react";

const Demmovideo = ({
  demovideo,
  installationVideo,
}: {
  demovideo?: string;
  installationVideo?: string;
}) => {
  // Function to check if the link is from YouTube
  const isYouTubeLink = (url?: string) => url?.includes("youtube.com") || url?.includes("youtu.be");

  // Function to convert normal YouTube links into embeddable format
  const getYouTubeEmbedUrl = (url: string) => {
    const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
    return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : url;
  };

  return (
    <div className="mt-5 px-4 h-[400px]">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        Demo Videos
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Demo Video */}
        {demovideo && (
          <div className="bg-white shadow-lg rounded-2xl p-4 flex flex-col items-center">
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">
              Demo Video
            </h2>
            {isYouTubeLink(demovideo) ? (
              <iframe
                className="rounded-lg w-full h-[300px]"
                src={getYouTubeEmbedUrl(demovideo)}
                title="Demo Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
            ) : (
              <video className="rounded-lg w-full h-[300px]" controls src={demovideo}>
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        )}

        {/* Installation Video */}
        {installationVideo && (
          <div className="bg-white shadow-lg rounded-2xl p-4 flex flex-col items-center">
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">
              Installation Video
            </h2>
            {isYouTubeLink(installationVideo) ? (
              <iframe
                className="rounded-lg w-full h-[300px]"
                src={getYouTubeEmbedUrl(installationVideo)}
                title="Installation Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
            ) : (
              <video className="rounded-lg w-full h-[300px]" controls src={installationVideo}>
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Demmovideo;
