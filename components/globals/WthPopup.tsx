// PopupHOC.tsx
import React, { useState, ReactNode, ComponentType } from 'react';

type PopupProps = {
    popupContent?: ReactNode;
};

type InjectedProps = {
    openPopup: () => void;
    closePopup: () => void;
};

const WithPopup = <P extends InjectedProps>(WrappedComponent: ComponentType<P>) => {
    return (props: Omit<P, keyof InjectedProps> & PopupProps) => {
        const [isOpen, setIsOpen] = useState(true);

        const openPopup = () => setIsOpen(true);
        const closePopup = () => setIsOpen(false);

        return (
            <div>
                <WrappedComponent {...(props as P)} openPopup={openPopup} closePopup={closePopup} />

                {isOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white rounded-2xl shadow-lg p-6 w-1/3 relative">
                            <button
                                className="absolute top-2 right-2 text-xl text-gray-600 hover:text-black"
                                onClick={closePopup}
                            >
                                ×
                            </button>
                            {props.popupContent || 'Popup Content'}
                        </div>
                    </div>
                )}
            </div>
        );
    };
};

export default WithPopup;

 
 

 
