import React from 'react';

function ToastJSX(toast: any) {
	return (
		<div className="absolute max-w-[50%] max-h-40 m-auto flex justify-center items-center drop-shadow-2xl rounded shadow-lg bg-blue-400 top-0 left-0 right-0 text-2xl text-white z-[9999] animate-bounce">
			{toast?.message.toUpperCase()}
		</div>
	);
}

export default ToastJSX;
