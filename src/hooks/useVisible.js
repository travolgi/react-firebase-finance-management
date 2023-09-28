import { useState, useEffect } from 'react';

const useVisible = size => {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		window.addEventListener('scroll', () => {
			window.scrollY > size ?
			setVisible(true) :
			setVisible(false)
		});
	})

	return visible;
}

export default useVisible;