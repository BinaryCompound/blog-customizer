import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';

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
      className={`${styles.container} ${isOpen ? styles.container_open : ''}`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      <img
        src={arrow}
        alt="иконка стрелочки"
        className={isOpen ? styles.arrow_open : styles.arrow}  // Изменяем стиль стрелки в зависимости от состояния
      />
    </div>
  );
};
