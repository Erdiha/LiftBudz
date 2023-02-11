import React, { useState } from 'react';

interface ToastProps {
	message: string;
	type?: 'success' | 'error' | 'info';
	duration?: number;
}

interface ToastConfig {
	defaultType?: 'success' | 'error' | 'info';
	defaultDuration?: number;
}

const useToast = (
	config: ToastConfig = { defaultType: 'success', defaultDuration: 3000 }
) => {
	const [toast, setToast] = useState<ToastProps | null>(null);

	const showToast = (
		message: string,
		type = config.defaultType,
		duration = config.defaultDuration
	) => {
		setToast({ message, type, duration });
		setTimeout(() => setToast(null), duration);
	};

	return { toast, showToast };
};

export default useToast;
