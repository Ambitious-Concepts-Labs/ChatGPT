import React from "react";

const Model = (props: any) => {
  const { showModal, CloseModal } = props;
  
  return (
    <>
      {showModal && (
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10 transition-all">
          <div className="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white">
            <div className="w-full">
              <div className="m-8 my-20 max-w-[400px] mx-auto">
                <div className="mb-8">
                  <p className="text-gray-600">Do not have enough token</p>
                </div>
                <div className="space-y-4">
                  <button
                    className="p-3 bg-white border rounded-full w-full font-semibold"
                    onClick={CloseModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Model;
