import constructorStyles from './style.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { dropIngredientFromBurger, moveIngredient } from '../../services/slices/burgerIngredients';

export function BurgerConstructorIngredient({ pk, item }) {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const burgerIngredients = useSelector((state) => state.burgerIngredientsSlice);

  const [, drag] = useDrag({
    type: 'dragged',
    item: { item, id: pk },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'dragged',
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.id;
      const hoverIndex = pk;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch(moveIngredient({ dragIndex, hoverIndex }));
    },
  });

  drag(drop(ref));

  return (
    <div className={constructorStyles.element} ref={ref}>
      <DragIcon
        className={pk !== 0 && pk !== burgerIngredients.length - 1 ? '' : constructorStyles.hidden}
        type="primary"
      />
      <ConstructorElement
        type={(pk === 0 && 'top') || (pk === burgerIngredients.length - 1 && 'bottom')}
        isLocked={pk === 0 || pk === burgerIngredients.length - 1}
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => dispatch(dropIngredientFromBurger(pk))}
      />
    </div>
  );
}
