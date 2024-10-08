import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from 'components/text';
import { Select } from 'components/select';

// константы
import {
	OptionType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

// хуки и библиотеки
import { FormEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

// стили
import styles from './ArticleParamsForm.module.scss';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';

type TArticleParamsForm = {
	setAppOptions: (value: ArticleStateType) => void; // функция для пропса, чтобы связать с Аппом
};

export const ArticleParamsForm = ({ setAppOptions }: TArticleParamsForm) => {
	//состояние открыто-закрыто
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	//ссылка на aside
	const asideRef = useRef<HTMLFormElement | null>(null);

	//функция тоггла открытия-закрытия
	const onMenuOpenClick = () => {
		setIsMenuOpen(prev => !prev);
	};

	//навешивание функции закрытия по клику через useEffect
	useEffect(() => {
		const onClickOutsideForm = (event: MouseEvent) => {
			//функция закрытия по клику за пределами формы
			if (asideRef.current && !asideRef.current.contains(event.target as Node)) {
				setIsMenuOpen(false);
			}
		};
		if (isMenuOpen) {
			window.addEventListener('mousedown', onClickOutsideForm);
		} else {
			window.removeEventListener('mousedown', onClickOutsideForm);
		}
		return () => {
			window.removeEventListener('mousedown', onClickOutsideForm);
		};
	}, [isMenuOpen]);

	//опции формы
	const [formOptions, setFormOptions] = useState(defaultArticleState);

	// функция для обновления любых опций
	const handleOptionChange = (key: keyof ArticleStateType) => (value: OptionType) => {
		setFormOptions(prevOptions => ({
			...prevOptions,
			[key]: value,
		}));
	};

	const onReset = () => {
		//сбрасывает значения формы
		setFormOptions(defaultArticleState);
		setAppOptions(defaultArticleState);
	};

	const onSubmit = (event: FormEvent) => {
		//сабмит значений формы
		event.preventDefault();
		setAppOptions(formOptions);
	};

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={onMenuOpenClick} />

			<aside
				ref={asideRef}
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form className={styles.form} onSubmit={onSubmit}>
					<Text as={'h2'} size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={formOptions.fontFamilyOption}
						options={fontFamilyOptions}
						title="Шрифт"
						onChange={handleOptionChange('fontFamilyOption')}
					/>
					<RadioGroup
						name="font size"
						options={fontSizeOptions}
						selected={formOptions.fontSizeOption}
						title="Размер шрифта"
						onChange={handleOptionChange('fontSizeOption')}
					/>
					<Select
						selected={formOptions.fontColor}
						options={fontColors}
						title="Цвет шрифта"
						onChange={handleOptionChange('fontColor')}
					/>
					<Separator />
					<Select
						selected={formOptions.backgroundColor}
						options={backgroundColors}
						title="Цвет фона"
						onChange={handleOptionChange('backgroundColor')}
					/>
					<Select
						selected={formOptions.contentWidth}
						options={contentWidthArr}
						title="Ширина контента"
						onChange={handleOptionChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title="Сбросить" type="reset" onClick={onReset} />
						<Button title="Применить" type="submit" />
					</div>
				</form>
			</aside>
		</>
	);
};
