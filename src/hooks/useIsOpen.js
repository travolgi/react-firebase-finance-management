import { useState, useCallback } from 'react'

const useIsOpen = () => {
	const [isOpen, setIsOpen] = useState(false);
	
	const handleIsOpen = useCallback(e => {
		if(e) {
			e.stopPropagation();
		}
		setIsOpen(!isOpen);
	}, [isOpen]);

	return [isOpen, handleIsOpen]
};

export default useIsOpen;