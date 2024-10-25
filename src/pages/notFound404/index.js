import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import notFoundStyles from './style.module.css';
import { useNavigate } from 'react-router-dom';

export function NotFound404Card() {
  const navigate = useNavigate();
  return (
    <>
      <p className="text_type_main-small">Страница не найдена</p>
      <div className={notFoundStyles.buttonContainer}>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          extraClass={notFoundStyles.buttonField}
          onClick={() => navigate(-1)}
        >
          Назад
        </Button>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          extraClass={notFoundStyles.buttonField}
          onClick={() => navigate('/')}
        >
          Главная
        </Button>
      </div>
    </>
  );
}
