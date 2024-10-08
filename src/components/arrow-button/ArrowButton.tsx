import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type TArrowButton = {
	onClick: () => void;
	isOpen: boolean;
};

export const ArrowButton = ({ onClick, isOpen }: TArrowButton) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <div
      role="button"
      aria-label={isOpen ? 'Закрыть форму параметров статьи' : 'Открыть форму параметров статьи'}
      tabIndex={0}
      className={styles.container}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      <img
        src={arrow}
        alt="иконка стрелочки"
        className={isOpen ? styles.arrowOpen : styles.arrow}  // Изменение стиля в зависимости от состояния
      />
    </div>
  );
};
