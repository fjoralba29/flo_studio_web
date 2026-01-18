import clsx from 'clsx'

const themes = {
	primary: 'border-[white_white_transparent]',
	secondary: 'border-[black_black_transparent]',
	tertiary: 'border-[#FFD41A_#FFD41A_transparent]',
}

interface Props {
	theme?: keyof typeof themes
	className?: string
}

const Loader = ({ theme = 'primary', className }: Props) => {
	const classNames = clsx(
		'animate-spin',
		'rounded-full',
		'border-2',
		'border-solid',
		'inline-block',
		'clip-loader',
		'h-[16px] w-[16px]',
		themes[theme],
		className
	)

	return <div className={classNames} />
}

export default Loader
