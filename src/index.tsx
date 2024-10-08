import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { ArticleStateType, defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {

	  //состояние для хранения параметров статьи
	  const [articleOptions, setArticleOptions] = useState<ArticleStateType>(defaultArticleState);

	  //Реализуем функцию для обновления опций
	  const setAppOptions = (value: ArticleStateType) => {
		  setArticleOptions(value);
	  };
	  return (
        <div
            className={clsx(styles.main)}
            style={
                {
                    '--font-family': articleOptions.fontFamilyOption.value,
                    '--font-size': articleOptions.fontSizeOption.value,
                    '--font-color': articleOptions.fontColor.value,
                    '--container-width': articleOptions.contentWidth.value,
                    '--bg-color': articleOptions.backgroundColor.value,
                } as CSSProperties
            }>
            <ArticleParamsForm setAppOptions={setAppOptions} />
            <Article />
        </div>
    );
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
