import useVisible from '../hooks/useVisible';

export default function ScrollTop() {
	const visible = useVisible(180),
			handleGoTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

	return (
		<button
			className={visible ? 'gotop visible' : 'gotop'}
			onClick={handleGoTop}
		>
			<span className="sr-only">Scroll to top</span>
		</button>
	);
}